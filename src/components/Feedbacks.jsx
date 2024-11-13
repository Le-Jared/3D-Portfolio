import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import * as faceapi from 'face-api.js';
import { Camera } from 'lucide-react';

const WebcamComponent = () => {
  const videoRef = useRef(null);
  const boxCanvasRef = useRef(null);
  const textCanvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMode, setActiveMode] = useState("age-gender");
  const detectionInterval = useRef(null);
  const textUpdateInterval = useRef(null);
  const [showPermissionDialog, setShowPermissionDialog] = useState(true);

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
        
        if (showPermissionDialog) {
          return;
        }
        
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
      if (textUpdateInterval.current) {
        clearInterval(textUpdateInterval.current);
      }
    };
  }, [showPermissionDialog]);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
      }
      if (textUpdateInterval.current) {
        clearInterval(textUpdateInterval.current);
      }
      startDetection();
    }
  }, [activeMode]);

  const startDetection = () => {
    const video = videoRef.current;
    const boxCanvas = boxCanvasRef.current;
    const textCanvas = textCanvasRef.current;

    if (!video || !boxCanvas || !textCanvas) return;

    boxCanvas.width = video.videoWidth;
    boxCanvas.height = video.videoHeight;
    textCanvas.width = video.videoWidth;
    textCanvas.height = video.videoHeight;

    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight
    };

    faceapi.matchDimensions(boxCanvas, displaySize);
    faceapi.matchDimensions(textCanvas, displaySize);

    let detections = [];

    detectionInterval.current = setInterval(async () => {
      try {
        if (activeMode === "age-gender") {
          detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withAgeAndGender();
        } else {
          detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
        }

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        const boxCtx = boxCanvas.getContext('2d');
        boxCtx.clearRect(0, 0, boxCanvas.width, boxCanvas.height);
        faceapi.draw.drawDetections(boxCanvas, resizedDetections);
      } catch (err) {
        console.error('Detection error:', err);
      }
    }, 500); 

    textUpdateInterval.current = setInterval(() => {
      const textCtx = textCanvas.getContext('2d');
      textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
    
      detections.forEach((detection, index) => {
        const { detection: { box } } = detection;
        let label;
    
        if (activeMode === "age-gender") {
          const { age, gender } = detection;
          label = `Age: ${Math.round(age)} | Gender: ${gender}`;
        } else {
          const { expressions } = detection;
          const mostLikelyExpression = Object.entries(expressions)
            .reduce((prev, current) => prev[1] > current[1] ? prev : current);
          label = `Expression: ${mostLikelyExpression[0]} (${(mostLikelyExpression[1] * 100).toFixed(1)}%)`;
        }

        const drawBox = new faceapi.draw.DrawBox(box, { 
          boxColor: '#4287f5',
          drawLabelOptions: {
            drawLabel: false 
          }
        });
        drawBox.draw(textCanvas);

        const padding = 20;
        const lineHeight = 30;
        const yPosition = textCanvas.height - padding - (detections.length - 1 - index) * lineHeight;

        textCtx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        textCtx.roundRect(
          padding, 
          yPosition - 20, 
          textCtx.measureText(label).width + 20, 
          30, 
          5
        );
        textCtx.fill();

        textCtx.font = '16px Inter';
        textCtx.fillStyle = '#ffffff';
        textCtx.fillText(label, padding + 10, yPosition);
      });
    }, 100);
  };

  const handleVideoPlay = () => {
    startDetection();
  };

  const handleAcceptPermission = async () => {
    setShowPermissionDialog(false);
    try {
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

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.5, 0.75)}
      className="bg-black-200 p-5 rounded-3xl w-full"
    >
    {showPermissionDialog && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-tertiary p-6 rounded-xl max-w-md m-4">
          <h3 className="text-xl font-bold mb-4 text-white">Camera Permission Required</h3>
          <div className="space-y-4">
            <p className="text-white">
              This face analysis demo needs camera access to:
            </p>
            <ul className="list-disc list-inside text-white space-y-2 ml-4">
              <li>Detect faces in real-time</li>
              <li>Analyze age and gender characteristics</li>
              <li>Recognize facial expressions</li>
            </ul>
            {/* Updated privacy notice section */}
            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <p className="text-sm text-white">
                <strong className="text-violet-400 font-bold">Privacy Notice:</strong>{' '}
                All processing is done locally in your browser. 
                No video data is stored or transmitted to any server.
              </p>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                onClick={() => setError("Camera permission denied by user")}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors"
                onClick={handleAcceptPermission}
              >
                Allow Camera Access
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

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
            ref={boxCanvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          />
          <canvas
            ref={textCanvasRef}
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
              ? "Point your camera at faces to estimate age and gender"
              : "Point your camera at faces to detect expressions"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SectionWrapper(WebcamComponent, "webcam");
