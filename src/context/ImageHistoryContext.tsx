import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ImageHistoryItem, DetectionResult } from '../types';

interface ImageHistoryContextType {
  history: ImageHistoryItem[];
  addToHistory: (result: DetectionResult) => void;
  clearHistory: () => void;
}

const ImageHistoryContext = createContext<ImageHistoryContextType | undefined>(undefined);

interface ImageHistoryProviderProps {
  children: ReactNode;
}

export const ImageHistoryProvider: React.FC<ImageHistoryProviderProps> = ({ children }) => {
  const [history, setHistory] = useState<ImageHistoryItem[]>([]);

  const addToHistory = (result: DetectionResult) => {
    const historyItem: ImageHistoryItem = {
      id: Date.now().toString(),
      originalImage: result.originalImage,
      processedImage: result.processedImage,
      detectedObjects: result.detectedObjects,
      timestamp: new Date(),
    };

    setHistory((prevHistory) => [historyItem, ...prevHistory]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <ImageHistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </ImageHistoryContext.Provider>
  );
};

export const useImageHistory = (): ImageHistoryContextType => {
  const context = useContext(ImageHistoryContext);
  
  if (context === undefined) {
    throw new Error('useImageHistory must be used within an ImageHistoryProvider');
  }
  
  return context;
};