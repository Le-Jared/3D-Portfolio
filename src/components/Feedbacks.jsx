import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import * as faceapi from 'face-api.js';
import { Camera } from 'lucide-react';

const WebcamComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMode, setActiveMode] = useState("age-gender");
  const detectionInterval = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models'),
          faceapi.nets.ageGenderNet.loadFromUri('/models')
        ]);
        
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadModels();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
      }
      startDetection();
    }
  }, [activeMode]);

  const startDetection = () => {
    detectionInterval.current = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight
      };

      faceapi.matchDimensions(canvas, displaySize);

      try {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resizedDetections);

        resizedDetections.forEach(detection => {
          const box = detection.detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: activeMode === "age-gender"
              ? `Age: ${Math.round(detection.age)} Gender: ${detection.gender}`
              : `Expression: ${Object.entries(detection.expressions)
                  .reduce((a, b) => (a[1] > b[1] ? a : b))[0]}`
          });
          drawBox.draw(canvas);

          if (activeMode === "expression") {
            const expressions = detection.expressions;
            const mostLikelyExpression = Object.entries(expressions)
              .reduce((prev, current) => 
                prev[1] > current[1] ? prev : current
              );
            
            const drawOptions = {
              fontSize: 20,
              fontStyle: 'Georgia',
              fontColor: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: 10
            };

            const drawTextField = new faceapi.draw.DrawTextField(
              [`${mostLikelyExpression[0]}: ${(mostLikelyExpression[1] * 100).toFixed(1)}%`],
              { x: box.x, y: box.bottom + 3 },
              drawOptions
            );
            drawTextField.draw(canvas);
          }
        });
      } catch (err) {
        console.error('Detection error:', err);
      }
    }, 100);
  };

  const handleVideoPlay = () => {
    startDetection();
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.5, 0.75)}
      className="bg-black-200 p-5 rounded-3xl w-full"
    >
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}>
        <div className="text-center mb-4">
          <p className={styles.sectionSubText}>Real-time Detection</p>
          <h2 className={`${styles.sectionHeadText} animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black`}>
            Face Analysis
          </h2>
        </div>

        <div className="flex justify-center mb-4">
          <div className="bg-tertiary rounded-lg p-1 inline-flex">
            <button
              onClick={() => setActiveMode("age-gender")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeMode === "age-gender"
                  ? "bg-primary text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Age & Gender
            </button>
            <button
              onClick={() => setActiveMode("expression")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeMode === "expression"
                  ? "bg-primary text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Expression
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center p-4">
            Error: {error}
          </div>
        )}

        <div className="relative w-full max-w-[640px] mx-auto">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onPlay={handleVideoPlay}
            style={{
              width: '100%',
              height: 'auto'
            }}
            className="rounded-lg"
          />
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-secondary text-[14px]">
            <Camera className="inline mr-2" />
            {activeMode === "age-gender" 
              ? "Point your camera at faces to detect age and gender"
              : "Point your camera at faces to detect expressions"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SectionWrapper(WebcamComponent, "webcam");
