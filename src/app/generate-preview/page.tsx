"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-08-15T00:00:00+02:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function PreviewGenerator() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [ogImageUrl, setOgImageUrl] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Generate OG image URL with current time
    const url = new URL('/og-image', window.location.origin);
    url.searchParams.set('days', timeLeft.days.toString());
    url.searchParams.set('hours', timeLeft.hours.toString());
    url.searchParams.set('minutes', timeLeft.minutes.toString());
    setOgImageUrl(url.toString());
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Open Graph Preview Generator</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Canvas Preview */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Canvas Preview</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <canvas 
                id="countdownCanvas" 
                width="600" 
                height="315" 
                className="w-full border border-gray-300 rounded"
              />
              <div className="mt-4">
                <button
                  onClick={() => {
                    const canvas = document.getElementById('countdownCanvas') as HTMLCanvasElement;
                    const ctx = canvas.getContext('2d');
                    
                    // Clear canvas
                    ctx.fillStyle = "#2c3e50";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    // Draw background
                    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                    gradient.addColorStop(0, "#667eea");
                    gradient.addColorStop(1, "#764ba2");
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    // Text styling
                    ctx.fillStyle = "#ffffff";
                    ctx.textAlign = "center";
                    ctx.font = "bold 40px Arial";
                    ctx.fillText("NOCH", canvas.width / 2, 75);
                    
                    // Countdown numbers
                    ctx.font = "bold 75px Arial";
                    ctx.fillStyle = "#e74c3c";
                    ctx.fillText(`${timeLeft.days}T : ${timeLeft.hours}H : ${timeLeft.minutes}M`, canvas.width / 2, 175);
                    
                    ctx.font = "20px Arial";
                    ctx.fillStyle = "#bdc3c7";
                    ctx.fillText("Klicke für den Live-Timer", canvas.width / 2, 250);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Generate Preview
                </button>
              </div>
            </div>
          </div>

          {/* OG Image Preview */}
          <div>
            <h2 className="text-xl font-semibold mb-4">OG Image Preview</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              {ogImageUrl && (
                <img 
                  src={ogImageUrl} 
                  alt="OG Preview" 
                  className="w-full border border-gray-300 rounded"
                />
              )}
              <div className="mt-4 text-sm text-gray-600">
                <p>OG Image URL:</p>
                <code className="bg-gray-100 p-2 rounded block break-all">
                  {ogImageUrl}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Testing Instructions */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Testing Instructions</h2>
          <div className="space-y-2">
            <p><strong>Telegram:</strong></p>
            <p>1. Send this link to @WebpageBot</p>
            <p>2. Click "Update Preview" to get the latest version</p>
            
            <p className="mt-4"><strong>WhatsApp:</strong></p>
            <p>1. Add a version parameter to force refresh: ?v=2</p>
            <p>2. Share the link in WhatsApp</p>
          </div>
        </div>

        {/* Current Countdown Values */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Current Countdown Values</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-blue-500 text-white p-4 rounded">
              <div className="text-2xl font-bold">{timeLeft.days}</div>
              <div>Tage</div>
            </div>
            <div className="bg-green-500 text-white p-4 rounded">
              <div className="text-2xl font-bold">{timeLeft.hours}</div>
              <div>Stunden</div>
            </div>
            <div className="bg-yellow-500 text-white p-4 rounded">
              <div className="text-2xl font-bold">{timeLeft.minutes}</div>
              <div>Minuten</div>
            </div>
            <div className="bg-red-500 text-white p-4 rounded">
              <div className="text-2xl font-bold">{timeLeft.seconds}</div>
              <div>Sekunden</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}