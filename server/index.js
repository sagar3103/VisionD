import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { PythonShell } from 'python-shell';

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'image-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (ext && mimetype) {
      return cb(null, true);
    }
    
    cb(new Error('Only image files are allowed!'));
  }
});

// Create outputs directory if it doesn't exist
const outputsDir = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputsDir)) {
  fs.mkdirSync(outputsDir, { recursive: true });
}

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve uploaded and processed images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));

// API endpoint for object detection
app.post('/api/detect', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  const inputImagePath = req.file.path;
  const fileName = path.basename(inputImagePath);
  const outputImagePath = path.join(outputsDir, fileName);

  // Sample response - in a real implementation, this would call the YOLOv8 model
  // This is mocked for demonstration purposes
  
  // For a full implementation, you would use PythonShell to run the YOLOv8 model
  // Example:
  // PythonShell.run('detect.py', {
  //   mode: 'text',
  //   pythonPath: 'python3',
  //   args: [inputImagePath, outputImagePath]
  // }, function (err, results) {
  //   if (err) {
  //     return res.status(500).json({ error: 'Failed to process image' });
  //   }
  //   
  //   // Parse results and return
  //   const detections = JSON.parse(results[0]);
  //   
  //   return res.json({
  //     originalImage: `/uploads/${fileName}`,
  //     processedImage: `/outputs/${fileName}`,
  //     detectedObjects: detections
  //   });
  // });

  // Mock response for demonstration
  setTimeout(() => {
    // Create a copy of the input image as the "processed" image
    fs.copyFileSync(inputImagePath, outputImagePath);
    
    // Generate mock detection results
    const mockObjects = [
      { name: "person", confidence: 0.92, bbox: { x1: 100, y1: 150, x2: 200, y2: 350 } },
      { name: "car", confidence: 0.88, bbox: { x1: 300, y1: 200, x2: 450, y2: 300 } },
      { name: "dog", confidence: 0.75, bbox: { x1: 50, y1: 400, x2: 150, y2: 480 } }
    ];
    
    return res.json({
      originalImage: `/uploads/${fileName}`,
      processedImage: `/outputs/${fileName}`,
      detectedObjects: mockObjects
    });
  }, 2000); // Simulate processing delay
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});