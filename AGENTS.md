# AGENTS.md

## Pipeline Check

Vor jedem Commit und regelmäßig prüfen:

```bash
gh run list --limit 5
```

Fehlgeschlagene Runs anzeigen:

```bash
gh run view <run-id> --log-failed
```

## AWS Credentials

```bash
export AWS_ACCESS_KEY_ID="$(pass show home/it/cloud/aws.amazon.com/iam/adm | awk -F': ' 'NR==2 {print $2}')"
export AWS_SECRET_ACCESS_KEY="$(pass show home/it/cloud/aws.amazon.com/iam/adm | awk 'NR==1')"
export AWS_DEFAULT_REGION="eu-central-1"
```

## Terraform

Bootstrap (einmalig):

```bash
cd infrastructure/bootstrap
terraform init
terraform apply
```

Haupt-Infrastruktur:

```bash
cd infrastructure
terraform init
terraform apply
```

Outputs anzeigen:

```bash
terraform output
```

## Build & Deploy

```bash
npm install
npm run build
```

Git:

```bash
git add .
git commit -m "message"
git push origin main
```

## OG-Image URLs

| Detail-Level | URL |
|--------------|-----|
| Full (Default) | `/og` |
| Nur Tage | `/og?detail=days` |
| Tage + Stunden | `/og?detail=hours` |

Base URL: `https://9zexw0j4ok.execute-api.eu-central-1.amazonaws.com`

## Projektstruktur

```
├── src/app/              # Next.js App Router
│   └── page.tsx          # Hauptseite mit Countdown
├── infrastructure/       # Terraform
│   ├── src/index.mjs     # Lambda Code
│   └── *.tf              # Terraform Config
├── .github/workflows/    # GitHub Actions
└── out/                  # Build Output (GitHub Pages)
```
