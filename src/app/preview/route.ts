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
}