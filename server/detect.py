import sys
from ultralytics import YOLO
import cv2
import os

def detect_objects(image_path):
    model = YOLO('yolov8n.pt')  # Ensure this model file is available
    results = model(image_path)
    result = results[0]

    # Draw bounding boxes on the image
    annotated_frame = result.plot()

    # Save the annotated image
    output_path = os.path.join('uploads', f'processed_{os.path.basename(image_path)}')
    cv2.imwrite(output_path, annotated_frame)

if __name__ == "__main__":
    image_path = sys.argv[1]
    detect_objects(image_path)
