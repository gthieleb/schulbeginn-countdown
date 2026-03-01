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
}