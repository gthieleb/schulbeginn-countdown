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
}