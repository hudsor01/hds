'use client';

import { Button } from '@mui/material';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/utils/supabase/client';
import { FileText, Trash2, Upload } from 'react-feather';
import { useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase_db.types';

interface FileData {
  name: string;
  size: number;
  created_at: string;
  url: string;
}

interface FileManagerProps {
  propertyId: string;
}

export default function FileManager({ propertyId }: FileManagerProps) {
  const [files, setFiles] = useState<FileData[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const supabase = createClient() as SupabaseClient<Database>;

  const uploadFile = async (file: globalThis.File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${propertyId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('property-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = await supabase.storage
        .from('property-documents')
        .getPublicUrl(filePath);

      if (!urlData) throw new Error('Failed to get file URL');

      const newFile: FileData = {
        name: file.name,
        size: file.size,
        created_at: new Date().toISOString(),
        url: urlData.publicUrl,
      };

      setFiles(prev => [...prev, newFile]);
      toast({
        message: 'File uploaded successfully',
        variant: 'success',
      });
    } catch (error) {
      toast({
        message: error instanceof Error ? error.message : 'Failed to upload file',
        variant: 'error',
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('property-documents')
        .remove([`${propertyId}/${fileName}`]);

      if (error) throw error;

      setFiles(prev => prev.filter(file => file.name !== fileName));
      toast({
        message: 'File deleted successfully',
        variant: 'success',
      });
    } catch (error) {
      toast({
        message: error instanceof Error ? error.message : 'Failed to delete file',
        variant: 'error',
      });
    }
  };

  return (
    <Card>
      <CardHeader title="Property Documents" />
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center">
            <Button
              variant="contained"
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={uploading}
              startIcon={<Upload />}
              fullWidth
              sx={{ maxWidth: { sm: 'auto' } }}
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </Button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) uploadFile(file);
              }}
            />
          </div>

          <div className="divide-y">
            {files.map(file => (
              <div key={file.name} className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline"
                    >
                      {file.name}
                    </a>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB •{' '}
                      {new Date(file.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteFile(file.name)}
                  startIcon={<Trash2 />}
                >
                  Delete
                </Button>
              </div>
            ))}
            {files.length === 0 && (
              <p className="py-4 text-center text-gray-500">No documents uploaded yet</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
