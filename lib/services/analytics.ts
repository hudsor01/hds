'use server'

import { cookies } from 'next/headers'

export async function trackPageView(
    pageUrl: string,
    userId?: string
) {
    const supabase = createClient()

    try {
        const { error } = await supabase.from('page_views').insert({
            url: pageUrl,
            user_id: userId,
            timestamp: new Date().toISOString()
        })

        if (error) throw error
        return { error: null }
    } catch (error) {
        console.error('Error tracking page view:', error)
        return { error }
    }
}

export async function trackEvent(
    eventName: string,
    properties?: Record<string, any>,
    userId?: string
) {
    const supabase = createClient()

    try {
        const { error } = await supabase.from('events').insert({
            name: eventName,
            properties,
            user_id: userId,
            timestamp: new Date().toISOString()
        })

        if (error) throw error
        return { error: null }
    } catch (error) {
        console.error('Error tracking event:', error)
        return { error }
    }
}

export async function getAnalytics(
    userId: string,
    startDate: Date,
    endDate: Date
) {
    const supabase = createClient()

    try {
        const { data: pageViews, error: pageViewsError } =
            await supabase
                .from('page_views')
                .select('*')
                .eq('user_id', userId)
                .gte('timestamp', startDate.toISOString())
                .lte('timestamp', endDate.toISOString())

        if (pageViewsError) throw pageViewsError

        const { data: events, error: eventsError } = await supabase
            .from('events')
            .select('*')
            .eq('user_id', userId)
            .gte('timestamp', startDate.toISOString())
            .lte('timestamp', endDate.toISOString())

        if (eventsError) throw eventsError

        return {
            data: { pageViews, events },
            error: null
        }
    } catch (error) {
        console.error('Error fetching analytics:', error)
        return { data: null, error }
    }
}
