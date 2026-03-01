<<<<<<< HEAD
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const days = searchParams.get('days') || '167'
  
  // SVG Canvas für Preview
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#2c3e50" />
      
      <rect x="50" y="50" width="1100" height="530" rx="20" fill="white" />
      
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
      
      <circle cx="100" cy="100" r="30" fill="#3498db" opacity="0.1"/>
      <circle cx="1100" cy="530" r="40" fill="#e74c3c" opacity="0.1"/>
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
          background: '#2c3e50',
        }}
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
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
          NOCH
        </div>

        {/* Countdown Numbers */}
        <div
          style={{
            fontSize: 150,
            fontWeight: 'bold',
            color: '#e74c3c',
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          {days}T : {hours}H : {minutes}M
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 40,
            textAlign: 'center',
            opacity: 0.8,
            marginBottom: 60,
          }}
        >
          Klicke für den Live-Timer
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
          Schulbeginn Countdown 2026
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