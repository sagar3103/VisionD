import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageUploader from '../components/ImageUploader';
import ResultDisplay from '../components/ResultDisplay';
import EmptyState from '../components/EmptyState';
import { useImageHistory } from '../context/ImageHistoryContext';
import { DetectionResult } from '../types';

const HomePage: React.FC = () => {
  const [result, setResult] = useState<DetectionResult | null>(null);
  const { addToHistory } = useImageHistory();

  const handleUploadComplete = (data: DetectionResult) => {
    setResult(data);
    addToHistory(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 mb-3"
        >
          Object Detection with YOLOv8
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Upload an image and our AI will identify and highlight objects within it.
          Powered by state-of-the-art YOLOv8 technology.
        </motion.p>
      </div>
      
      <div className="mb-12">
        <ImageUploader onUploadComplete={handleUploadComplete} />
      </div>
      
      {result ? (
        <ResultDisplay 
          originalImage={result.originalImage}
          processedImage={result.processedImage}
          detectedObjects={result.detectedObjects}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default HomePage;