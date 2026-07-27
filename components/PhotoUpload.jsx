'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

// mestar's create-pending-order accepts one child photo (uploaded as a base64
// data URL alongside order creation, not as a standalone presigned upload) —
// so this only needs to hold a single file locally and read it as a data URL.
// The actual upload happens later, inside createPendingOrder().
export function PhotoUpload({ onPhotosChange }) {
  const [photo, setPhoto] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const next = {
        file,
        preview: URL.createObjectURL(file),
        dataUrl: reader.result,
      };
      setPhoto(next);
      onPhotosChange?.([next]);
    };
    reader.readAsDataURL(file);
  }, [onPhotosChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const removePhoto = () => {
    setPhoto(null);
    onPhotosChange?.([]);
  };

  return (
    <div className="space-y-6">
      {!photo ? (
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
            <p className="text-lg text-purple-600 font-medium">Drop your photo here...</p>
          ) : (
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drag & drop your child's photo here
              </p>
              <p className="text-sm text-gray-500 mb-4">or click to browse</p>
              <p className="text-xs text-gray-400">
                Accepted: JPEG, PNG, WEBP • Max size: 5MB
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-48 aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 mx-auto">
          <Image src={photo.preview} alt="Selected photo" fill className="object-cover" />
          <button
            onClick={removePhoto}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {photo && (
        <div className="text-center">
          <Button onClick={removePhoto} variant="outline" size="sm">
            Choose a Different Photo
          </Button>
        </div>
      )}
    </div>
  );
}
