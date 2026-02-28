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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 flex flex-col items-center justify-center p-8">
      <main className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
          📚 Countdown zum Schulbeginn
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12">
          15. August 2026 - Sachsen-Anhalt
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
          Für Nepomuk - 6. Klasse 📖
        </p>
      </main>
    </div>
  );
}
