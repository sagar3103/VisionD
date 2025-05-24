const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage });

// Endpoint to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = path.join(__dirname, req.file.path);

  // Spawn a Python process to run YOLOv8 detection
  const pythonProcess = spawn('python', ['detect.py', imagePath]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    // Send the path to the processed image back to the frontend
    res.json({ imageUrl: `http://localhost:${PORT}/uploads/processed_${req.file.filename}` });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
