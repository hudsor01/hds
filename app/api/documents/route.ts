import { supabase } from '@/lib/supabase';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const documentSchema = z.object({
  name: z.string().min(1, 'Document name is required'),
  description: z.string().optional(),
  type: z.enum(['LEASE', 'MAINTENANCE', 'PROPERTY', 'TENANT', 'OTHER']),
  property_id: z.string().uuid('Invalid property ID').optional(),
  lease_id: z.string().uuid('Invalid lease ID').optional(),
  url: z.string().url('Invalid document URL'),
  size: z.number().positive('File size must be positive'),
});

export async function GET(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const searchParams = req.nextUrl.searchParams;
    const property_id = searchParams.get('property_id');
    const lease_id = searchParams.get('lease_id');
    const type = searchParams.get('type');

    let query = supabase
      .from('documents')
      .select('*')
      .eq('uploaded_by', userId)
      .order('created_at', {ascending: false});

    if (property_id) {
      query = query.eq('property_id', property_id);
    }

    if (lease_id) {
      query = query.eq('lease_id', lease_id);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const {data: documents, error} = await query;

    if (error) {
      console.error('Error fetching documents:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({data: documents});
  } catch (error) {
    console.error('Error in document GET route:', error);
    return NextResponse.json({error: 'Failed to fetch documents'}, {status: 500});
  }
}

export async function POST(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body = await req.json();
    const validatedData = documentSchema.parse(body);

    // Verify property ownership if property_id is provided
    if (validatedData.property_id) {
      const {data: property, error: propertyError} = await supabase
        .from('properties')
        .select('id')
        .eq('id', validatedData.property_id)
        .eq('user_id', userId)
        .single();

      if (propertyError || !property) {
        return NextResponse.json({error: 'Property not found or unauthorized'}, {status: 404});
      }
    }

    // Verify lease ownership if lease_id is provided
    if (validatedData.lease_id) {
      const {data: lease, error: leaseError} = await supabase
        .from('leases')
        .select('id')
        .eq('id', validatedData.lease_id)
        .eq('user_id', userId)
        .single();

      if (leaseError || !lease) {
        return NextResponse.json({error: 'Lease not found or unauthorized'}, {status: 404});
      }
    }

    const {data: document, error} = await supabase
      .from('documents')
      .insert([{...validatedData, uploaded_by: userId}])
      .select()
      .single();

    if (error) {
      console.error('Error creating document:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    // Create notification for new document
    await supabase.from('notifications').insert([
      {
        user_id: userId,
        type: 'DOCUMENT',
        title: 'New Document Added',
        message: `A new ${validatedData.type} document has been added: ${validatedData.name}`,
        data: {
          document_id: document.id,
          document_type: validatedData.type,
          property_id: validatedData.property_id,
          lease_id: validatedData.lease_id,
        },
      },
    ]);

    return NextResponse.json({data: document}, {status: 201});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error in document POST route:', error);
    return NextResponse.json({error: 'Failed to create document'}, {status: 500});
  }
}

export async function PUT(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body = await req.json();
    const {id, ...updateData} = body;

    if (!id) {
      return NextResponse.json({error: 'Document ID is required'}, {status: 400});
    }

    const validatedData = documentSchema.partial().parse(updateData);

    // Verify document ownership
    const {data: existingDocument, error: documentCheckError} = await supabase
      .from('documents')
      .select('id')
      .eq('id', id)
      .eq('uploaded_by', userId)
      .single();

    if (documentCheckError || !existingDocument) {
      return NextResponse.json({error: 'Document not found or unauthorized'}, {status: 404});
    }

    const {data: document, error} = await supabase
      .from('documents')
      .update(validatedData)
      .eq('id', id)
      .eq('uploaded_by', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating document:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({data: document});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error in document PUT route:', error);
    return NextResponse.json({error: 'Failed to update document'}, {status: 500});
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({error: 'Document ID is required'}, {status: 400});
    }

    // Verify document ownership
    const {data: document, error: documentCheckError} = await supabase
      .from('documents')
      .select('url')
      .eq('id', id)
      .eq('uploaded_by', userId)
      .single();

    if (documentCheckError || !document) {
      return NextResponse.json({error: 'Document not found or unauthorized'}, {status: 404});
    }

    // Delete file from storage
    const fileUrl = new URL(document.url);
    const filePath = fileUrl.pathname.substring(1); // Remove leading slash
    const {error: storageError} = await supabase.storage.from('documents').remove([filePath]);

    if (storageError) {
      console.error('Error deleting file from storage:', storageError);
      // Continue with database deletion even if storage deletion fails
    }

    const {error} = await supabase
      .from('documents')
      .delete()
      .eq('id', id)
      .eq('uploaded_by', userId);

    if (error) {
      console.error('Error deleting document:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({message: 'Document deleted successfully'}, {status: 200});
  } catch (error) {
    console.error('Error in document DELETE route:', error);
    return NextResponse.json({error: 'Failed to delete document'}, {status: 500});
  }
}
