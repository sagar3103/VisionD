import React from 'react';
import { motion } from 'framer-motion';
import { ImagePlus } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 px-4"
    >
      <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <ImagePlus className="h-12 w-12 text-blue-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">No Images Yet</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        Upload an image to get started with object detection. 
        Our AI will identify objects and highlight them for you.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <span className="text-sm">Fast Processing</span>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <span className="text-sm">Secure & Private</span>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-3">
          <div className="bg-purple-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <span className="text-sm">Powered by YOLOv8</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState;