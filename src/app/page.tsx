"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

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

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shadow-lg">
        <span className="text-4xl md:text-6xl font-bold">{value}</span>
      </div>
      <span className="mt-3 text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  const isCountdownComplete =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <>
      <Head>
        <title>Countdown zum Schulbeginn 2026 - Klasse 1, Grundschule Stadtfeld</title>
        <meta name="description" content="Countdown zum Schulbeginn am 15. August 2026 für Klasse 1, Grundschule Stadtfeld" />
        <meta property="og:title" content="Noch 167 Tage bis zum Schulbeginn 2026!" />
        <meta property="og:description" content="Countdown zum Schulbeginn am 15. August 2026 für Klasse 1, Grundschule Stadtfeld" />
        <meta property="og:image" content="https://gthieleb.github.io/schulbeginn-countdown/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Countdown zum Schulbeginn 2026 - Klasse 1, Grundschule Stadtfeld" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gthieleb.github.io/schulbeginn-countdown" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Noch 167 Tage bis zum Schulbeginn 2026!" />
        <meta name="twitter:description" content="Countdown zum Schulbeginn am 15. August 2026 für Klasse 1, Grundschule Stadtfeld" />
        <meta name="twitter:image" content="https://gthieleb.github.io/schulbeginn-countdown/og-image.svg" />
        
        <link rel="canonical" href="https://gthieleb.github.io/schulbeginn-countdown" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 flex flex-col items-center justify-center p-8">
      <main className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
          📚 Countdown zum Schulbeginn
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12">
          15. August 2026 - Klasse 1, Grundschule Stadtfeld
        </p>

        {isCountdownComplete ? (
          <div className="text-4xl md:text-6xl font-bold text-green-600 dark:text-green-400 animate-pulse">
            🎉 Schule hat begonnen! 🎉
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <CountdownUnit value={timeLeft.days} label="Tage" />
            <CountdownUnit value={timeLeft.hours} label="Stunden" />
            <CountdownUnit value={timeLeft.minutes} label="Minuten" />
            <CountdownUnit value={timeLeft.seconds} label="Sekunden" />
          </div>
        )}

        <p className="mt-12 text-gray-500 dark:text-gray-400 text-sm">
          Klasse 1 - Grundschule Stadtfeld 📖
        </p>
      </main>
      
      {/* Canvas für Preview */}
      <canvas 
        id="preview-canvas" 
        width="1200" 
        height="630" 
        className="hidden"
        style={{ display: 'none' }}
      />
      
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Canvas für Preview rendern
            const canvas = document.getElementById('preview-canvas');
            if (canvas) {
              const ctx = canvas.getContext('2d');
              if (ctx) {
                // Hintergrund
                const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
                gradient.addColorStop(0, '#667eea');
                gradient.addColorStop(1, '#764ba2');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 1200, 630);
                
                // Weißer Rahmen mit Schatten
                ctx.shadowColor = 'rgba(0,0,0,0.1)';
                ctx.shadowBlur = 20;
                ctx.shadowOffsetY = 10;
                ctx.fillStyle = 'white';
                ctx.roundRect(50, 50, 1100, 530, 20);
                ctx.fill();
                
                // Reset Shadow
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
                ctx.shadowOffsetY = 0;
                
                // Text
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 48px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Countdown zum Schulbeginn', 600, 200);
                
                ctx.font = '24px Arial';
                ctx.fillStyle = '#7f8c8d';
                ctx.fillText('Klasse 1, Grundschule Stadtfeld', 600, 280);
                
                ctx.font = 'bold 72px Arial';
                ctx.fillStyle = '#2c3e50';
                ctx.fillText('${timeLeft.days} Tage', 600, 400);
                
                ctx.font = '18px Arial';
                ctx.fillStyle = '#95a5a6';
                ctx.fillText('bis zum 15. August 2026', 600, 480);
              }
            }
          `
        }}
      />
    </div>
    </>
  );
}
