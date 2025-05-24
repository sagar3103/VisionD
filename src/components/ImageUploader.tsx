import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface ImageUploaderProps {
  onUploadComplete: (result: any) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadComplete }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Reset states
    setError(null);
    setUploading(true);

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Upload file
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:3000/api/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onUploadComplete(response.data);
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1,
  });

  const removePreview = () => {
    setPreview(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!preview ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-400'
          } ${isDragReject ? 'border-red-500 bg-red-50' : ''}`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-teal-100 p-4 rounded-full">
              <Upload className="h-8 w-8 text-teal-600" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-800">
                {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
              </p>
              <p className="text-sm text-gray-500 mt-1">or click to select a file</p>
            </div>
            
            <p className="text-xs text-gray-400">
              Supports JPG, PNG, WEBP, and other common image formats
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative rounded-lg overflow-hidden shadow-md"
        >
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-auto max-h-96 object-contain bg-gray-100"
          />
          
          {!uploading && (
            <button 
              onClick={removePreview}
              className="absolute top-2 right-2 bg-black bg-opacity-60 text-white p-1 rounded-full hover:bg-opacity-80 transition-opacity"
              aria-label="Remove image"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center text-white">
                <Loader2 className="h-10 w-10 animate-spin mx-auto" />
                <p className="mt-2 font-medium">Processing image...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-2 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ImageUploader;