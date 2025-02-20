import { supabase } from '@/lib/supabase/auth'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const messageSchema = z.object({
    recipient_id: z.string().uuid('Invalid recipient ID'),
    subject: z.string().optional(),
    content: z.string().min(1, 'Message content is required'),
    attachments: z.array(z.string()).optional(),
    parent_id: z
        .string()
        .uuid('Invalid parent message ID')
        .optional(),
    thread_id: z.string().uuid('Invalid thread ID').optional()
})

const threadSchema = z.object({
    subject: z.string().min(1, 'Thread subject is required'),
    participants: z.array(z.string().uuid('Invalid participant ID'))
})

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const {
            data: { user },
            error
        } = await supabase.auth.getUser()
        if (error || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const searchParams = req.nextUrl.searchParams
        const thread_id: string | null = searchParams.get('thread_id')
        const unread_only: boolean =
            searchParams.get('unread_only') === 'true'
        const limit: number = parseInt(
            searchParams.get('limit') || '50',
            10
        )
        const offset: number = parseInt(
            searchParams.get('offset') || '0',
            10
        )

        let query
        if (thread_id) {
            // Get messages from a specific thread
            query = supabase
                .from('messages')
                .select('*, sender:sender_id(*)')
                .eq('thread_id', thread_id)
                .order('created_at', { ascending: true })
                .range(offset, offset + limit - 1)
        } else {
            // Get message threads for the user
            query = supabase
                .from('message_threads')
                .select('*, last_message:last_message_id(*)')
                .contains('participants', [user.id])
                .order('updated_at', { ascending: false })
                .range(offset, offset + limit - 1)

            if (unread_only) {
                query = query.is('read_at', null)
            }
        }

        const { data, error: queryError } = await query

        if (queryError) {
            console.error('Error fetching messages:', queryError)
            return NextResponse.json(
                { error: queryError.message },
                { status: 500 }
            )
        }

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Error in messages GET route:', error)
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const {
            data: { user },
            error
        } = await supabase.auth.getUser()
        if (error || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await req.json()
        const { create_thread, ...messageData } = body

        if (create_thread) {
            // Create a new message thread
            const validatedData = threadSchema.parse(messageData)

            // Ensure the sender is included in participants
            if (!validatedData.participants.includes(user.id)) {
                validatedData.participants.push(user.id)
            }

            const { data: thread, error: threadError } =
                await supabase
                    .from('message_threads')
                    .insert([
                        {
                            subject: validatedData.subject,
                            participants: validatedData.participants
                        }
                    ])
                    .select()
                    .single()

            if (threadError) {
                console.error(
                    'Error creating message thread:',
                    threadError
                )
                return NextResponse.json(
                    { error: threadError.message },
                    { status: 500 }
                )
            }

            return NextResponse.json(
                { data: thread },
                { status: 201 }
            )
        } else {
            // Create a new message
            const validatedData = messageSchema.parse(messageData)

            // Verify recipient exists and is valid
            const { data: recipient, error: recipientError } =
                await supabase
                    .from('users')
                    .select('id')
                    .eq('id', validatedData.recipient_id)
                    .single()

            if (recipientError || !recipient) {
                return NextResponse.json(
                    { error: 'Recipient not found' },
                    { status: 404 }
                )
            }

            // If thread_id is provided, verify the sender is a participant
            if (validatedData.thread_id) {
                const { data: thread, error: threadError } =
                    await supabase
                        .from('message_threads')
                        .select('participants')
                        .eq('id', validatedData.thread_id)
                        .single()

                if (threadError || !thread) {
                    return NextResponse.json(
                        { error: 'Thread not found' },
                        { status: 404 }
                    )
                }

                if (!thread.participants.includes(user.id)) {
                    return NextResponse.json(
                        {
                            error: 'Not authorized to post in this thread'
                        },
                        { status: 403 }
                    )
                }
            }

            const { data: message, error: messageError } =
                await supabase
                    .from('messages')
                    .insert([
                        {
                            ...validatedData,
                            sender_id: user.id
                        }
                    ])
                    .select()
                    .single()

            if (messageError) {
                console.error('Error creating message:', messageError)
                return NextResponse.json(
                    { error: messageError.message },
                    { status: 500 }
                )
            }

            // Update thread's last_message_id if this is a thread message
            if (validatedData.thread_id) {
                await supabase
                    .from('message_threads')
                    .update({
                        last_message_id: message.id,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', validatedData.thread_id)
            }

            // Create notification for recipient
            await supabase.from('notifications').insert([
                {
                    user_id: validatedData.recipient_id,
                    type: 'MESSAGE',
                    title: 'New Message',
                    message: `You have received a new message${validatedData.subject ? `: ${validatedData.subject}` : ''}`,
                    data: {
                        message_id: message.id,
                        thread_id: validatedData.thread_id,
                        sender_id: user.id
                    }
                }
            ])

            return NextResponse.json(
                { data: message },
                { status: 201 }
            )
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            )
        }
        console.error('Error in messages POST route:', error)
        return NextResponse.json(
            { error: 'Failed to create message' },
            { status: 500 }
        )
    }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    try {
        const {
            data: { user },
            error
        } = await supabase.auth.getUser()
        if (error || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await req.json()
        const { id, mark_as_read, ...updateData } = body

        if (!id) {
            return NextResponse.json(
                { error: 'Message ID is required' },
                { status: 400 }
            )
        }

        // For marking messages as read
        if (mark_as_read) {
            const { data: message, error: messageError } =
                await supabase
                    .from('messages')
                    .update({ read_at: new Date().toISOString() })
                    .eq('id', id)
                    .eq('recipient_id', user.id)
                    .select()
                    .single()

            if (messageError) {
                console.error(
                    'Error marking message as read:',
                    messageError
                )
                return NextResponse.json(
                    { error: messageError.message },
                    { status: 500 }
                )
            }

            return NextResponse.json({ data: message })
        }

        // For other message updates
        const validatedData = messageSchema
            .partial()
            .parse(updateData)

        const { data: message, error: messageError } = await supabase
            .from('messages')
            .update(validatedData)
            .eq('id', id)
            .eq('sender_id', user.id) // Only allow sender to update message
            .select()
            .single()

        if (messageError) {
            console.error('Error updating message:', messageError)
            return NextResponse.json(
                { error: messageError.message },
                { status: 500 }
            )
        }

        return NextResponse.json({ data: message })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            )
        }
        console.error('Error in messages PUT route:', error)
        return NextResponse.json(
            { error: 'Failed to update message' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: NextRequest
): Promise<NextResponse> {
    try {
        const {
            data: { user },
            error
        } = await supabase.auth.getUser()
        if (error || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const id = req.nextUrl.searchParams.get('id')
        if (!id) {
            return NextResponse.json(
                { error: 'Message ID is required' },
                { status: 400 }
            )
        }

        // Verify message ownership
        const { data: message, error: messageCheckError } =
            await supabase
                .from('messages')
                .select('sender_id, thread_id')
                .eq('id', id)
                .single()

        if (messageCheckError || !message) {
            return NextResponse.json(
                { error: 'Message not found' },
                { status: 404 }
            )
        }

        if (message.sender_id !== user.id) {
            return NextResponse.json(
                { error: 'Not authorized to delete this message' },
                { status: 403 }
            )
        }

        const { error: deleteError } = await supabase
            .from('messages')
            .delete()
            .eq('id', id)
            .eq('sender_id', user.id)

        if (deleteError) {
            console.error('Error deleting message:', deleteError)
            return NextResponse.json(
                { error: deleteError.message },
                { status: 500 }
            )
        }

        // If this was the last message in a thread, update the thread's last_message_id
        if (message.thread_id) {
            const { data: lastMessage } = await supabase
                .from('messages')
                .select('id')
                .eq('thread_id', message.thread_id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single()

            if (lastMessage) {
                await supabase
                    .from('message_threads')
                    .update({ last_message_id: lastMessage.id })
                    .eq('id', message.thread_id)
            }
        }

        return NextResponse.json(
            { message: 'Message deleted successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error in messages DELETE route:', error)
        return NextResponse.json(
            { error: 'Failed to delete message' },
            { status: 500 }
        )
    }
}
