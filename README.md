# Weather App

En modern väderapplikation byggd med React och Vite. Appen hämtar väderdata från [WeatherAPI](https://www.weatherapi.com/) och visar aktuell information för valfri stad.

## Funktioner

- Sök väder för valfri stad
- Visar temperatur, vind, luftfuktighet och väderbeskrivning
- Snygg och responsiv design
- LocalStorage för att spara senaste sökning
- Lint-test via GitHub Actions
- Automatisk deploy till staging (test) och production via Vercel

## Workflow

### Branch-struktur

- **main**: Produktionsbranch. All kod som mergas hit deployas automatiskt till produktionsmiljön på Vercel.
- **staging**: Testbranch. All kod som pushas hit deployas automatiskt till en testmiljö (preview) på Vercel.

### Utvecklingsflöde

1. Skapa en feature-branch från `staging` för nya funktioner.
2. När du är klar, skapa en pull request till `staging`.
3. När koden är testad och godkänd i staging, skapa en pull request från `staging` till `main`.
4. All kod i `main` är alltid produktionsklar.

### CI/CD

- **Lint-test** körs automatiskt på staging-branchen via GitHub Actions (`.github/workflows/lint.yml`).
- **Deploy** sker automatiskt till Vercel för både staging och production.

## Kom igång

1. Klona repot:
   ```bash
   git clone https://github.com/JonasB81/weather-app.git
   cd weather-app
   ```
2. Installera beroenden:
   ```bash
   npm install
   ```
3. Skapa en `.env`-fil i projektroten:
   ```
   VITE_WEATHER_API_KEY=din_api_nyckel
   VITE_WEATHER_API_BASE_URL=http://api.weatherapi.com/v1
   ```
4. Starta utvecklingsservern:
   ```bash
   npm run dev
   ```

## Deployment

- **Production:** https://ditt-vercel-namn.vercel.app (main)
- **Staging/Test:** Preview-länk från Vercel (staging)

## Licens

MIT
