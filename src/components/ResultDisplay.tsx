import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ZoomIn, Maximize2 } from 'lucide-react';
import { DetectedObject } from '../types';

interface ResultDisplayProps {
  originalImage: string;
  processedImage: string;
  detectedObjects: DetectedObject[];
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  originalImage, 
  processedImage, 
  detectedObjects 
}) => {
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.click();
    }
  };

  // Group detected objects by name and count them
  const objectCounts = detectedObjects.reduce((acc, obj) => {
    const name = obj.name;
    if (!acc[name]) {
      acc[name] = {
        count: 1,
        totalConfidence: obj.confidence,
      };
    } else {
      acc[name].count += 1;
      acc[name].totalConfidence += obj.confidence;
    }
    return acc;
  }, {} as Record<string, { count: number, totalConfidence: number }>);

  // Sort objects by count (descending)
  const sortedObjects = Object.entries(objectCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([name, data]) => ({
      name,
      count: data.count,
      avgConfidence: data.totalConfidence / data.count,
    }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detection Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Comparison */}
          <div className="space-y-4">
            <div className="relative group rounded-lg overflow-hidden border border-gray-200">
              <p className="absolute top-2 left-2 bg-blue-900 text-white text-xs font-medium px-2 py-1 rounded-md">
                Original
              </p>
              <img 
                src={originalImage} 
                alt="Original" 
                className="w-full h-auto object-contain bg-gray-50"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
              <button className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4 text-gray-700" />
              </button>
            </div>
            
            <div className="relative group rounded-lg overflow-hidden border border-gray-200">
              <p className="absolute top-2 left-2 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded-md">
                Processed
              </p>
              <img 
                src={processedImage} 
                alt="Processed with detections" 
                className="w-full h-auto object-contain bg-gray-50"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
              <div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white bg-opacity-80 p-1.5 rounded-full shadow-md">
                  <ZoomIn className="h-4 w-4 text-gray-700" />
                </button>
                <button 
                  onClick={handleDownload}
                  className="bg-white bg-opacity-80 p-1.5 rounded-full shadow-md"
                >
                  <Download className="h-4 w-4 text-gray-700" />
                </button>
                <a 
                  ref={downloadRef}
                  href={processedImage}
                  download="detected-image.jpg"
                  className="hidden"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
          
          {/* Detection Results */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Detected Objects
              </h3>
              
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {sortedObjects.length > 0 ? (
                  sortedObjects.map((obj, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className="font-medium text-gray-800 capitalize">
                          {obj.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          {obj.count} {obj.count === 1 ? 'item' : 'items'}
                        </span>
                        <span className="text-gray-500">
                          {Math.round(obj.avgConfidence * 100)}% confidence
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No objects detected
                  </p>
                )}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Summary</h3>
              <p className="text-blue-800">
                Detected {detectedObjects.length} instance{detectedObjects.length !== 1 ? 's' : ''} of{' '}
                {Object.keys(objectCounts).length} unique object{Object.keys(objectCounts).length !== 1 ? 's' : ''}
              </p>
              
              {detectedObjects.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.keys(objectCounts).map((name, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-white text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultDisplay;