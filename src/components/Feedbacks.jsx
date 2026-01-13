import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import * as faceapi from "face-api.js";
import { Camera, RefreshCw } from "lucide-react";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";

const MODEL_URL = `${import.meta.env.BASE_URL}models/`;

const DETECTION_FPS = 10;
const DETECTOR_OPTIONS = new faceapi.TinyFaceDetectorOptions({
  inputSize: 224,
  scoreThreshold: 0.5,
});

function roundRectSafe(ctx, x, y, w, h, r = 8) {
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
}

const WebcamComponent = () => {
  const videoRef = useRef(null);
  const overlayCanvasRef = useRef(null);

  const rafRef = useRef(null);
  const lastDetectTimeRef = useRef(0);

  const latestDetectionRef = useRef(null);
  const modeModelReadyRef = useRef(false);
  const streamRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [modelsReady, setModelsReady] = useState(false);
  const [error, setError] = useState(null);

  const [activeMode, setActiveMode] = useState("age-gender");
  const activeModeRef = useRef(activeMode);

  const [permissionDenied, setPermissionDenied] = useState(
    localStorage.getItem("cameraDenied") === "true"
  );
  const [showPermissionDialog, setShowPermissionDialog] = useState(
    !localStorage.getItem("cameraDenied")
  );

  useEffect(() => {
    activeModeRef.current = activeMode;
  }, [activeMode]);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const cleanupAll = useCallback(() => {
    stopLoop();
    stopStream();
    latestDetectionRef.current = null;
  }, [stopLoop, stopStream]);

  const loadBaseModels = useCallback(async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ]);
  }, []);

  const loadModeModels = useCallback(async (mode) => {
    modeModelReadyRef.current = false;

    if (mode === "age-gender") {
      if (!faceapi.nets.ageGenderNet.isLoaded) {
        await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
      }
    } else {
      if (!faceapi.nets.faceExpressionNet.isLoaded) {
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      }
    }

    modeModelReadyRef.current = true;
  }, []);

  const setupCanvasToVideo = useCallback(() => {
    const video = videoRef.current;
    const canvas = overlayCanvasRef.current;
    if (!video || !canvas) return;

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(vw * dpr);
    canvas.height = Math.floor(vh * dpr);
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "user" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err?.message || "Unable to access camera");
    }
  }, []);

  const drawOverlay = useCallback(() => {
    const video = videoRef.current;
    const canvas = overlayCanvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return;

    ctx.clearRect(0, 0, vw, vh);

    const det = latestDetectionRef.current;
    if (!det) return;

    const { box } = det.detection;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#4287f5";
    ctx.strokeRect(box.x, box.y, box.width, box.height);

    const mode = activeModeRef.current;

    let label = "";
    if (mode === "age-gender") {
      const age = det.age ? Math.round(det.age) : "-";
      const gender = det.gender || "-";
      label = `Age: ${age} | Gender: ${gender}`;
    } else {
      const expressions = det.expressions || {};
      const best = Object.entries(expressions).reduce(
        (acc, cur) => (cur[1] > acc[1] ? cur : acc),
        ["neutral", 0]
      );
      label = `Expression: ${best[0]} (${(best[1] * 100).toFixed(0)}%)`;
    }

    ctx.font = "15px system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial";
    const textW = ctx.measureText(label).width;

    const x = Math.max(8, Math.min(box.x, vw - (textW + 20) - 8));
    const y = Math.max(24, box.y - 10);

    ctx.fillStyle = "rgba(0,0,0,0.6)";
    roundRectSafe(ctx, x, y - 20, textW + 20, 24, 6);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.fillText(label, x + 10, y - 4);
  }, []);

  const detectOnce = useCallback(async () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return;
    if (!modeModelReadyRef.current) return;

    const mode = activeModeRef.current;

    let chain = faceapi
      .detectSingleFace(video, DETECTOR_OPTIONS)
      .withFaceLandmarks();

    if (mode === "age-gender") chain = chain.withAgeAndGender();
    else chain = chain.withFaceExpressions();

    const raw = await chain;

    if (!raw) {
      latestDetectionRef.current = null;
      return;
    }

    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    latestDetectionRef.current = faceapi.resizeResults(raw, displaySize);
  }, []);

  const loop = useCallback((t) => {
    drawOverlay();

    const intervalMs = 1000 / DETECTION_FPS;
    if (t - lastDetectTimeRef.current > intervalMs) {
      lastDetectTimeRef.current = t;
      detectOnce().catch((e) => console.error("Detection error:", e));
    }

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        await loadBaseModels();
        if (cancelled) return;
        setModelsReady(true);
      } catch (e) {
        if (cancelled) return;
        setError(e?.message || "Failed to load base models");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadBaseModels]);

  useEffect(() => {
    if (!modelsReady) return;

    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        await loadModeModels(activeMode);
      } catch (e) {
        setError(e?.message || "Failed to load mode model");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [activeMode, loadModeModels, modelsReady]);

  useEffect(() => {
    if (!modelsReady) return;
    if (showPermissionDialog || permissionDenied) return;

    startCamera();
    return () => cleanupAll();
  }, [modelsReady, showPermissionDialog, permissionDenied, startCamera, cleanupAll]);

  const handleVideoReady = useCallback(() => {
    setupCanvasToVideo();
    stopLoop();
    lastDetectTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(loop);
  }, [setupCanvasToVideo, stopLoop, loop]);

  const handleAcceptPermission = () => {
    setShowPermissionDialog(false);
    localStorage.removeItem("cameraDenied");
    setPermissionDenied(false);
    setError(null);
  };

  const handleCancelPermission = () => {
    setShowPermissionDialog(false);
    setPermissionDenied(true);
    localStorage.setItem("cameraDenied", "true");
    setError("Camera permission denied by user");
    cleanupAll();
  };

  const handleRetry = () => {
    setError(null);
    setPermissionDenied(false);
    setShowPermissionDialog(true);
    localStorage.removeItem("cameraDenied");
  };

  const switchMode = (mode) => {
    latestDetectionRef.current = null;
    setActiveMode(mode);
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
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                onClick={handleCancelPermission}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors"
                onClick={handleAcceptPermission}
              >
                Allow Camera Access
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}>
        <div className="text-center mb-4">
          <p className={styles.sectionSubText}>Real-time Detection</p>
          <h2
            className={`${styles.sectionHeadText} animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black`}
          >
            Face Analysis
          </h2>
        </div>

        <div className="flex justify-center mb-4">
          <div className="bg-tertiary rounded-lg p-1 inline-flex">
            <button
              type="button"
              onClick={() => switchMode("age-gender")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeMode === "age-gender"
                  ? "bg-primary text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Age & Gender
            </button>

            <button
              type="button"
              onClick={() => switchMode("expression")}
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

        {isLoading && !permissionDenied && (
          <div className="flex items-center justify-center py-10">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
          </div>
        )}

        {error && (
          <div className="text-center p-4">
            <div className="text-red-500 mb-4">Error: {error}</div>
            {permissionDenied && (
              <button
                type="button"
                onClick={handleRetry}
                className="px-4 py-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors inline-flex items-center gap-2"
              >
                <RefreshCw size={18} />
                Try Again
              </button>
            )}
          </div>
        )}

        <div className="relative w-full max-w-[640px] mx-auto">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onLoadedMetadata={handleVideoReady}
            className="rounded-lg w-full h-auto"
          />
          <canvas
            ref={overlayCanvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-secondary text-[14px]">
            <Camera className="inline mr-2" />
            {activeMode === "age-gender"
              ? "Point your camera at a single face to estimate age and gender"
              : "Point your camera at a single face to detect expressions"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SectionWrapper(WebcamComponent, "webcam");