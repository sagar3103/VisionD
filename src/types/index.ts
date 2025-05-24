export interface DetectedObject {
  name: string;
  confidence: number;
  bbox: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}

export interface DetectionResult {
  originalImage: string;
  processedImage: string;
  detectedObjects: DetectedObject[];
}

export interface ImageHistoryItem {
  id: string;
  originalImage: string;
  processedImage: string;
  detectedObjects: DetectedObject[];
  timestamp: Date;
}