# Object Detection App with YOLOv8

This application allows users to upload images and detect objects within them using the state-of-the-art YOLOv8 model.

## Features

- Intuitive image upload interface with drag-and-drop support
- Object detection using YOLOv8
- Display of detected objects with bounding boxes
- Summary of detected objects with confidence scores
- History of previously analyzed images

## Project Structure

- `src/` - React frontend application
  - `components/` - Reusable UI components
  - `pages/` - Main application pages
  - `context/` - React context for state management
  - `types/` - TypeScript type definitions
- `server/` - Express backend server
  - `index.js` - Main server file
  - `detect.py` - Python script for YOLOv8 integration
  - `uploads/` - Directory for storing uploaded images
  - `outputs/` - Directory for storing processed images

## Getting Started

### Prerequisites

- Node.js (v14+)
- Python 3.8+ (for YOLOv8)

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```
   npm install
   ```
3. Install YOLOv8 (for the full implementation):
   ```
   pip install ultralytics
   ```

### Running the Application

1. Start the backend server:
   ```
   npm run server
   ```
2. In a separate terminal, start the frontend:
   ```
   npm run dev
   ```
3. Open your browser and navigate to the URL shown in the terminal

## Implementing Full YOLOv8 Integration

The current implementation includes a mock YOLOv8 detection script. To implement the full YOLOv8 functionality:

1. Uncomment the `PythonShell.run()` code in `server/index.js`
2. Replace the mock code in `server/detect.py` with the commented-out real implementation
3. Ensure you have PyTorch and Ultralytics installed:
   ```
   pip install torch torchvision ultralytics
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.