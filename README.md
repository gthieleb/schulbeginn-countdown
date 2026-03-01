# Schulbeginn Countdown 2026

Eine Next.js-App für den Countdown zum Schulbeginn am 15. August 2026 in Sachsen-Anhalt.

## Features

- 🎯 Live-Countdown mit Sekunden-Updates
- 📱 Responsive Design für alle Geräte
- 🌐 Open Graph Meta-Tags für Messenger-Vorschauen
- 🎨 Dynamische OG-Bilder für Social Media
- 🔄 Automatische Aktualisierung der Vorschau

## Open Graph Integration

Die App implementiert Open Graph Meta-Tags, damit Messenger wie WhatsApp und Telegram eine ansprechende Vorschau anzeigen:

### Aktuelle Meta-Tags:

```html
<meta property="og:title" content="Noch {days} Tage bis zum Schulbeginn 2026!">
<meta property="og:description" content="Countdown zum Schulbeginn am 15. August 2026 - Klasse 1, Grundschule Stadtfeld">
<meta property="og:image" content="https://schulbeginn-countdown.vercel.app/og-image">
<meta property="og:url" content="https://schulbeginn-countdown.vercel.app">
<meta property="og:type" content="website">
```

### Dynamische OG-Bilder

Die App generiert automatisch OG-Bilder mit dem aktuellen Countdown-Stand:

- `/og-image` - Haupt-OG-Bild mit komplettem Design
- `/preview` - Einfaches Vorschau-Bild

## Testing der Vorschau

### Für Telegram:
1. Sende den Link an [@WebpageBot](https://t.me/webpagebot)
2. Klicke auf "Update Preview", um die neueste Version zu laden

### Für WhatsApp:
1. Füge einen Version-Parameter hinzu: `?v=2`
2. Teile den Link in WhatsApp
3. Die Vorschau wird bei jedem neuen Teilen aktualisiert

### Entwicklungsumgebung:
1. Besuche `/generate-preview` für eine Testseite
2. Hier kannst du Canvas- und OG-Vorschau live sehen

## Deployment

Die App ist für Vercel optimiert. Nach jedem Deployment werden die OG-Bilder automatisch aktualisiert.

## Technologien

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Edge Runtime für OG-Image-Generation

## Zielgruppe

- Eltern von Schulkindern
- Grundschule Stadtfeld
- Klasse 1 - Schuljahrgang 2026/2027