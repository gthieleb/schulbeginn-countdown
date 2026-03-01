<<<<<<< HEAD
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const days = searchParams.get('days') || '167'
  
  // SVG Canvas für OG Image
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea" />
          <stop offset="100%" style="stop-color:#764ba2" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.1"/>
        </filter>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#bg)" />
      
      <rect x="50" y="50" width="1100" height="530" rx="20" fill="white" filter="url(#shadow)" />
      
      <text x="600" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#2c3e50">
        Countdown zum Schulbeginn
      </text>
      
      <text x="600" y="280" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#7f8c8d">
        Klasse 1, Grundschule Stadtfeld
      </text>
      
      <text x="600" y="400" text-anchor="middle" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#2c3e50">
        ${days} Tage
      </text>
      
      <text x="600" y="480" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#95a5a6">
        bis zum 15. August 2026
      </text>
      
      <circle cx="100" cy="100" r="30" fill="#667eea" opacity="0.1"/>
      <circle cx="1100" cy="530" r="40" fill="#764ba2" opacity="0.1"/>
    </svg>
  `
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
=======
import { NextResponse } from 'next/server'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Font data - you might need to adjust this based on your actual fonts
const fontData = new URL('../assets/inter-bold.ttf', import.meta.url).href

export async function GET() {
  const now = new Date()
  const targetDate = new Date("2026-08-15T00:00:00+02:00")
  const diff = targetDate.getTime() - now.getTime()

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          NOCH {days} TAGE BIS ZUM SCHULBEGINN 2026!
        </div>

        {/* Countdown Display */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginBottom: 60,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: 20,
              borderRadius: 15,
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              style={{
                fontSize: 120,
                fontWeight: 'bold',
              }}
            >
              {days}
            </div>
            <div
              style={{
                fontSize: 24,
                opacity: 0.8,
              }}
            >
              TAGE
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: 20,
              borderRadius: 15,
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              style={{
                fontSize: 120,
                fontWeight: 'bold',
              }}
            >
              {hours}
            </div>
            <div
              style={{
                fontSize: 24,
                opacity: 0.8,
              }}
            >
              STUNDEN
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: 20,
              borderRadius: 15,
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              style={{
                fontSize: 120,
                fontWeight: 'bold',
              }}
            >
              {minutes}
            </div>
            <div
              style={{
                fontSize: 24,
                opacity: 0.8,
              }}
            >
              MINUTEN
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 32,
            textAlign: 'center',
            opacity: 0.9,
            maxWidth: 800,
          }}
        >
          Klicke hier, um den Live-Countdown zu sehen!
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 18,
            opacity: 0.7,
          }}
        >
          Grundschule Stadtfeld • Klasse 1 • 15. August 2026
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
>>>>>>> 71b8bf9508a17f522689721db17f8e716d6aede0
}