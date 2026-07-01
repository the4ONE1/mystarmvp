'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

export function PhotoUpload({ onPhotosChange, childId = 'temp', storybookId = 'temp' }) {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'pending',
      progress: 0,
    }));
    
    setFiles((prev) => [...prev, ...newFiles]);
    if (onPhotosChange) {
      onPhotosChange([...files, ...newFiles]);
    }
  }, [files, onPhotosChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true,
  });

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    if (onPhotosChange) {
      onPhotosChange(newFiles);
    }
  };

  const uploadFile = async (fileState, index) => {
    try {
      setIsUploading(true);
      
      // Update status to uploading
      setFiles((prev) =>
        prev.map((f, i) => (i === index ? { ...f, status: 'uploading', progress: 10 } : f))
      );

      const { file } = fileState;

      // Step 1: Get presigned URL from our API
      const presignResponse = await fetch('/api/upload/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          orderId: storybookId || 'temp',
        }),
      });

      if (!presignResponse.ok) {
        const errorData = await presignResponse.json();
        throw new Error(errorData.error || 'Failed to get upload URL');
      }

      const { presignedUrl, publicUrl, key } = await presignResponse.json();
      
      setFiles((prev) =>
        prev.map((f, i) => (i === index ? { ...f, status: 'uploading', progress: 30 } : f))
      );

      // Step 2: Upload directly to S3 using presigned URL
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload to S3');
      }
      
      setFiles((prev) =>
        prev.map((f, i) => (i === index ? { ...f, status: 'uploading', progress: 90 } : f))
      );

      // Mark as uploaded with the S3 URL
      setFiles((prev) =>
        prev.map((f, i) =>
          i === index ? { 
            ...f, 
            status: 'uploaded', 
            progress: 100, 
            url: publicUrl,
            s3Key: key 
          } : f
        )
      );
    } catch (error) {
      console.error('Upload error:', error);
      setFiles((prev) =>
        prev.map((f, i) =>
          i === index ? { ...f, status: 'error', errorMessage: error.message } : f
        )
      );
    } finally {
      setIsUploading(false);
    }
  };

  const uploadAllPending = async () => {
    const pendingFiles = files.map((f, i) => ({ file: f, index: i })).filter((f) => f.file.status === 'pending');
    
    for (const { file, index } of pendingFiles) {
      await uploadFile(file, index);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-purple-500 bg-purple-50'
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        
        {isDragActive ? (
          <p className="text-lg text-purple-600 font-medium">Drop your photos here...</p>
        ) : (
          <div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drag & drop your child's photos here
            </p>
            <p className="text-sm text-gray-500 mb-4">or click to browse</p>
            <p className="text-xs text-gray-400">
              Accepted: JPEG, PNG, WEBP • Max size: 5MB per photo • Up to 5 photos
            </p>
          </div>
        )}
      </div>

      {/* File Previews */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Uploaded Photos ({files.length})</h3>
            {files.some((f) => f.status === 'pending') && (
              <Button
                onClick={uploadAllPending}
                disabled={isUploading}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                Upload All
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {files.map((fileState, index) => (
              <div key={index} className="relative group">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                  <Image
                    src={fileState.preview}
                    alt={`Photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Remove button */}
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  {/* Status overlay */}
                  {fileState.status !== 'pending' && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      {fileState.status === 'uploading' && (
                        <div className="text-white text-center w-full px-4">
                          <Progress value={fileState.progress} className="mb-2" />
                          <p className="text-sm">Uploading...</p>
                        </div>
                      )}
                      {fileState.status === 'uploaded' && (
                        <CheckCircle className="w-12 h-12 text-green-400" />
                      )}
                      {fileState.status === 'error' && (
                        <AlertCircle className="w-12 h-12 text-red-400" />
                      )}
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-gray-600 mt-1 truncate">{fileState.file.name}</p>
                
                {fileState.status === 'pending' && (
                  <Button
                    onClick={() => uploadFile(fileState, index)}
                    disabled={isUploading}
                    size="sm"
                    variant="outline"
                    className="w-full mt-2"
                  >
                    Upload
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}