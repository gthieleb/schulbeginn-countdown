const TARGET_DATE = new Date(process.env.TARGET_DATE || '2026-08-15T00:00:00+02:00');
const DEFAULT_DETAIL = process.env.DEFAULT_DETAIL || 'full';
const SCHOOL_TITLE = process.env.SCHOOL_TITLE || 'Countdown zum Schulbeginn';
const SCHOOL_SUBTITLE = process.env.SCHOOL_SUBTITLE || 'Klasse 1, Grundschule Stadtfeld';
const SCHOOL_DATE_STR = process.env.SCHOOL_DATE_STR || 'bis zum 15. August 2026';
const CACHE_MAX_AGE = parseInt(process.env.CACHE_MAX_AGE || '300', 10);

const DETAIL_LEVELS = {
  days: ['days'],
  hours: ['days', 'hours'],
  full: ['days', 'hours', 'minutes', 'seconds']
};

const LABELS = {
  days: 'Tage',
  hours: 'Stunden',
  minutes: 'Minuten',
  seconds: 'Sekunden'
};

function calculateTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isComplete: false
  };
}

function parseDetailLevel(event) {
  const queryString = event.rawQueryString || '';
  const params = new URLSearchParams(queryString);
  const detail = params.get('detail') || DEFAULT_DETAIL;
  
  if (DETAIL_LEVELS[detail]) {
    return detail;
  }
  return DEFAULT_DETAIL;
}

function generateCountdownBox(x, y, width, height, value, label, isCompact) {
  const boxRx = 15;
  const fontSize = isCompact ? 48 : 56;
  const labelSize = isCompact ? 14 : 16;
  
  return `
    <g transform="translate(${x}, ${y})">
      <rect width="${width}" height="${height}" rx="${boxRx}" fill="url(#boxGradient)" opacity="0.95"/>
      <rect width="${width}" height="${height}" rx="${boxRx}" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
      <text x="${width/2}" y="${height/2 - 5}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="white">
        ${value}
      </text>
      <text x="${width/2}" y="${height/2 + 22}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${labelSize}" fill="rgba(255,255,255,0.85)">
        ${label}
      </text>
    </g>
  `;
}

function generateSVG(timeLeft, detailLevel) {
  const levels = DETAIL_LEVELS[detailLevel];
  const numBoxes = levels.length;
  
  const canvasWidth = 1200;
  const canvasHeight = 630;
  const margin = 50;
  
  let boxWidth, boxHeight, boxGap, startX, startY, isCompact;
  
  if (numBoxes === 1) {
    boxWidth = 280;
    boxHeight = 180;
    boxGap = 0;
    isCompact = false;
    startX = (canvasWidth - boxWidth) / 2;
    startY = 280;
  } else if (numBoxes === 2) {
    boxWidth = 240;
    boxHeight = 160;
    boxGap = 40;
    isCompact = false;
    const totalWidth = (boxWidth * numBoxes) + (boxGap * (numBoxes - 1));
    startX = (canvasWidth - totalWidth) / 2;
    startY = 300;
  } else {
    boxWidth = 180;
    boxHeight = 140;
    boxGap = 30;
    isCompact = true;
    const totalWidth = (boxWidth * numBoxes) + (boxGap * (numBoxes - 1));
    startX = (canvasWidth - totalWidth) / 2;
    startY = 310;
  }

  let countdownBoxes = '';
  levels.forEach((key, index) => {
    const x = startX + (index * (boxWidth + boxGap));
    countdownBoxes += generateCountdownBox(x, startY, boxWidth, boxHeight, timeLeft[key], LABELS[key], isCompact);
  });

  if (timeLeft.isComplete) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${canvasWidth}" height="${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea"/>
      <stop offset="100%" style="stop-color:#764ba2"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="${margin}" y="${margin}" width="${canvasWidth - margin*2}" height="${canvasHeight - margin*2}" rx="20" fill="white" opacity="0.95"/>
  <text x="${canvasWidth/2}" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="#2c3e50">
    🎉 Schule hat begonnen! 🎉
    </text>
  <text x="${canvasWidth/2}" y="380" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#7f8c8d">
    ${SCHOOL_SUBTITLE}
  </text>
</svg>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${canvasWidth}" height="${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea"/>
      <stop offset="100%" style="stop-color:#764ba2"/>
    </linearGradient>
    <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.25)"/>
      <stop offset="100%" style="stop-color:rgba(255,255,255,0.1)"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <rect width="100%" height="100%" fill="url(#bg)"/>
  
  <rect x="${margin}" y="${margin}" width="${canvasWidth - margin*2}" height="${canvasHeight - margin*2}" rx="20" fill="white" filter="url(#shadow)"/>
  
  <text x="${canvasWidth/2}" y="130" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="bold" fill="#2c3e50">
    📚 ${SCHOOL_TITLE}
  </text>
  
  <text x="${canvasWidth/2}" y="175" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#7f8c8d">
    ${SCHOOL_SUBTITLE}
  </text>
  
  ${countdownBoxes}
  
  <text x="${canvasWidth/2}" y="540" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#95a5a6">
    ${SCHOOL_DATE_STR}
  </text>
  
  <circle cx="120" cy="100" r="40" fill="rgba(255,255,255,0.08)"/>
  <circle cx="1080" cy="530" r="50" fill="rgba(255,255,255,0.08)"/>
  <circle cx="150" cy="530" r="25" fill="rgba(255,255,255,0.05)"/>
  <circle cx="1050" cy="100" r="30" fill="rgba(255,255,255,0.06)"/>
</svg>`;
}

export const handler = async (event) => {
  const timeLeft = calculateTimeLeft();
  const detailLevel = parseDetailLevel(event);
  const svg = generateSVG(timeLeft, detailLevel);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
      'Access-Control-Allow-Origin': '*'
    },
    body: svg
  };
};
