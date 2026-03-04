# Schulbeginn Countdown 2026

Countdown zum Schulbeginn am 15. August 2026 - Klasse 1, Grundschule Stadtfeld

## Architektur

```
┌─────────────────┐      ┌─────────────────┐
│  GitHub Pages   │      │   AWS Lambda    │
│  (Next.js)      │      │  (OG-Image)     │
│  Hauptseite     │──┬──▶│  Dynamisches    │
│  Live-Countdown │  │   │  SVG            │
└─────────────────┘  │   └─────────────────┘
                     │            ▲
                     │   og:image URL
         ┌───────────┴────────────┴───────────┐
         │     WhatsApp / Telegram            │
         │     (Vorschau bei Link-Teilung)    │
         └────────────────────────────────────┘
```

## Features

- Live-Countdown mit Sekunden-Updates
- Responsive Design
- Dynamische OG-Bilder für Messenger-Vorschau
- Konfigurierbare Detail-Level für OG-Image

## Live URLs

| Service | URL |
|---------|-----|
| Hauptseite | https://gthieleb.github.io/schulbeginn-countdown/ |
| OG-Image (Full) | https://9zexw0j4ok.execute-api.eu-central-1.amazonaws.com/og |
| OG-Image (Days) | https://9zexw0j4ok.execute-api.eu-central-1.amazonaws.com/og?detail=days |
| OG-Image (Hours) | https://9zexw0j4ok.execute-api.eu-central-1.amazonaws.com/og?detail=hours |

## OG-Image Detail-Level

| URL | Anzeige |
|-----|---------|
| `/og` | Tage, Stunden, Minuten, Sekunden |
| `/og?detail=days` | Nur Tage |
| `/og?detail=hours` | Tage + Stunden |
| `/og?detail=full` | Tage, Stunden, Minuten, Sekunden |

## Deployment

### 1. Terraform Backend initialisieren (einmalig)

```bash
cd infrastructure/bootstrap
terraform init
terraform apply
```

### 2. Infrastruktur deployen

```bash
cd infrastructure
terraform init -backend-config="bucket=schulbeginn-countdown-tfstate"
terraform apply
```

### 3. OG-Image URL

Die OG-Image URL ist bereits in `src/app/layout.tsx` konfiguriert:

```tsx
images: [{ url: "https://9zexw0j4ok.execute-api.eu-central-1.amazonaws.com/og" }]
```

### 4. GitHub Pages deployen

```bash
npm run build
# Output in ./out wird automatisch via GitHub Actions deployt
```

## OG-Image Rendering Optionen

| Methode | Geschwindigkeit | Qualität | Aufwand |
|---------|-----------------|----------|---------|
| **SVG** (Aktuell) | ~50ms | Gut | Niedrig |
| node-canvas | ~200ms | Sehr gut | Mittel |
| Puppeteer | ~2000ms | Exakt | Hoch |

**Aktuell:** Erweitertes SVG mit Gradient-Hintergrund, abgerundeten Boxen und konfigurierbarem Detail-Level.

## Kosten (AWS Free Tier)

| Service | Kosten/Monat |
|---------|--------------|
| Lambda | ~$0 |
| API Gateway | ~$0 |
| S3 (Terraform State) | ~$0.01 |
| DynamoDB (Locks) | ~$0 |
| **Gesamt** | **< $0.10** |

## Konfiguration

Terraform Variablen in `infrastructure/variables.tf`:

| Variable | Default | Beschreibung |
|----------|---------|--------------|
| `aws_region` | eu-central-1 | AWS Region |
| `og_image_detail_level` | full | Default Detail-Level |
| `target_date` | 2026-08-15T00:00:00+02:00 | Zieldatum |
| `cache_max_age` | 300 | Cache in Sekunden |

## Technologien

- Next.js 16 (Static Export)
- React 19
- TypeScript
- Tailwind CSS
- AWS Lambda (Node.js 20)
- API Gateway v2
- Terraform

## Lokale Entwicklung

```bash
npm install
npm run dev
```

## Testing OG-Image

- Telegram: [@WebpageBot](https://t.me/webpagebot) - Link senden, "Update Preview"
- WhatsApp: URL mit `?v=2` Parameter erzwingt neuen Cache
- Facebook: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
