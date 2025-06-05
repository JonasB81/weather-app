# Golf Weather App

A modern weather application built with React and Vite, specifically designed for golfers. The app fetches weather data from [WeatherAPI](https://www.weatherapi.com/) and provides current conditions and golf-specific recommendations for any location.

## Features

- Search weather for any city worldwide
- Real-time weather data including:
  - Temperature
  - Wind speed and direction
  - Humidity
  - Weather conditions
- Golf-specific recommendations based on weather conditions
- Responsive design for all devices
- LocalStorage for saving recent searches
- Automated linting via GitHub Actions
- Automatic deployment to staging and production via Vercel

## Development Workflow

### Branch Structure

- **main**: Production branch. All code merged here is automatically deployed to the production environment on Vercel.
- **staging**: Testing branch. All code pushed here is automatically deployed to a preview environment on Vercel.

### Development Process

1. Create a feature branch from `staging` for new features
2. When complete, create a pull request to `staging`
3. After testing and approval in staging, create a pull request from `staging` to `main`
4. All code in `main` is always production-ready

### CI/CD Pipeline

- **Linting**: Automated linting runs on the main branch via GitHub Actions (`.github/workflows/lint.yml`)
- **Deployment**: Automatic deployment to Vercel for both staging and production environments

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/JonasB81/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:
   ```
   VITE_WEATHER_API_KEY=your_api_key
   VITE_WEATHER_API_BASE_URL=http://api.weatherapi.com/v1
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5174` (or the next available port)

## Golf Weather Features

The app provides golf-specific recommendations based on weather conditions:

- **Perfect Conditions**: When weather is ideal for golf
- **Not Ideal**: When conditions are unfavorable (e.g., rain or strong winds)
- **Moderate Conditions**: When conditions are acceptable but not perfect

## Deployment

- **Production**: https://your-vercel-name.vercel.app (main branch)
- **Staging/Test**: Preview link from Vercel (staging branch)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by [WeatherAPI](https://www.weatherapi.com/)
- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
