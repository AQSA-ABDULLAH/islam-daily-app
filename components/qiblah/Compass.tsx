import React, { useEffect, useState, useRef } from "react";

interface CompassProps {
  backendUrl?: string;
  alignmentThreshold?: number;
  smoothingSpeed?: number; // optional: how fast needle rotates
}

const Compass: React.FC<CompassProps> = ({
  backendUrl = "http://localhost:5000/api/qiblah/find",
  alignmentThreshold = 2,
  smoothingSpeed = 0.1, // smaller = slower, bigger = faster
}) => {
  const [qiblahAngle, setQiblahAngle] = useState<number>(0);
  const [heading, setHeading] = useState<number>(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const needleRotation = qiblahAngle - heading;
  const aligned = Math.abs(needleRotation) <= alignmentThreshold;

  const displayedRotation = useRef<number>(0);

  // Smoothly interpolate rotation
  useEffect(() => {
    let animationFrame: number;

    const updateNeedle = () => {
      // shortest path for rotation
      let diff = needleRotation - displayedRotation.current;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      displayedRotation.current += diff * smoothingSpeed;
      animationFrame = requestAnimationFrame(updateNeedle);
    };

    updateNeedle();
    return () => cancelAnimationFrame(animationFrame);
  }, [needleRotation, smoothingSpeed]);

  // Request permission for iOS
  const requestPermission = async () => {
    if ((DeviceOrientationEvent as any)?.requestPermission) {
      try {
        const res = await (DeviceOrientationEvent as any).requestPermission();
        if (res === "granted") setPermissionGranted(true);
      } catch (err) {
        console.error(err);
        setLocationError("Device orientation permission denied");
      }
    } else {
      setPermissionGranted(true);
    }
  };

  // Get user location & call backend
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(backendUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat: latitude, lng: longitude }),
          });

          const data = await res.json();
          if (data.success) setQiblahAngle(data.qiblahDirection);
          else setLocationError("Failed to calculate Qiblah");
        } catch (err) {
          console.error(err);
          setLocationError("Backend API error");
        }
      },
      () => setLocationError("Location permission denied")
    );
  }, [backendUrl]);

  // Listen to device orientation
  useEffect(() => {
    if (!permissionGranted) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const heading = (e as any).webkitCompassHeading ?? e.alpha;
      if (heading !== null) setHeading(heading);
    };

    window.addEventListener("deviceorientation", handleOrientation, true);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, [permissionGranted]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      {!permissionGranted && (
        <button
          onClick={requestPermission}
          className="mb-6 px-6 py-2 bg-emerald-500 rounded-xl hover:bg-emerald-600 transition shadow-lg"
        >
          Enable Compass
        </button>
      )}

      <h1 className="text-3xl font-bold mb-6">Qiblah Compass</h1>

      {locationError && (
        <p className="text-red-400 mb-4 text-center">{locationError}</p>
      )}

      <div className="relative w-72 h-72 rounded-full border-4 border-white flex items-center justify-center shadow-2xl">
        {/* Compass Labels */}
        <div className="absolute top-2 text-sm font-bold">N</div>
        <div className="absolute bottom-2 text-sm font-bold">S</div>
        <div className="absolute left-2 text-sm font-bold">W</div>
        <div className="absolute right-2 text-sm font-bold">E</div>

        {/* Compass Needle */}
        <div
          className={`absolute w-1 h-32 origin-bottom transition-transform duration-200 ${
            aligned ? "bg-green-400" : "bg-emerald-400"
          }`}
          style={{ transform: `rotate(${displayedRotation.current}deg)` }}
        />

        {/* Center Dot */}
        <div className="w-4 h-4 bg-white rounded-full z-10" />

        {/* Aligned Indicator */}
        {aligned && (
          <div className="absolute bottom-4 text-green-400 font-semibold text-lg animate-pulse">
            Aligned!
          </div>
        )}
      </div>

      <p className="mt-6 text-gray-300">
        Qiblah Angle: {qiblahAngle.toFixed(2)}°
      </p>
    </div>
  );
};

export default Compass;