# Vercel Speed Insights Integration

This document explains the Vercel Speed Insights integration in this Express.js backend application.

## Overview

Vercel Speed Insights has been installed and configured for this project. The package `@vercel/speed-insights` (v2.0.0) is now available.

## Important Note

**Speed Insights is a frontend performance monitoring tool** that tracks Core Web Vitals (browser-based metrics like LCP, FID, CLS, etc.). This backend is a REST API server that primarily serves JSON responses.

Since this is an API-only backend without HTML pages, Speed Insights monitoring will not actively track performance data. However, the package is installed and configured for future use if:
- HTML pages are added to this backend
- The backend serves any web-based UI
- You need to integrate it with server-rendered pages

## What Was Installed

1. **Package**: `@vercel/speed-insights@2.0.0` added to dependencies
2. **Configuration Module**: `src/config/speedInsights.js`
   - Exports configuration options
   - Provides `initSpeedInsights()` function
   - Provides `getSpeedInsightsScript()` for HTML injection
3. **Middleware**: `src/middlewares/speedInsightsMiddleware.js`
   - Auto-injection middleware for HTML responses
   - Helper function for manual script injection
4. **App Integration**: Updated `src/app.js` to import configuration

## Configuration

Speed Insights configuration is in `src/config/speedInsights.js`:

```javascript
{
  debug: process.env.NODE_ENV === 'development',
  sampleRate: process.env.SPEED_INSIGHTS_SAMPLE_RATE || 1
}
```

### Environment Variables (Optional)

Add these to your `.env` file if you want to customize:

```env
# Speed Insights sample rate (0.0 to 1.0, default: 1)
SPEED_INSIGHTS_SAMPLE_RATE=1

# Only needed for self-hosted Speed Insights
# VERCEL_SPEED_INSIGHTS_DSN=your-dsn-here
```

## Usage Examples

### Option 1: Manual Script Injection (HTML Templates)

If you add routes that serve HTML:

```javascript
const { getSpeedInsightsScript } = require('./config/speedInsights');

app.get('/page', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Page</title>
        ${getSpeedInsightsScript()}
      </head>
      <body>
        <h1>Welcome</h1>
      </body>
    </html>
  `;
  res.send(html);
});
```

### Option 2: Automatic Injection Middleware

Apply the middleware to automatically inject Speed Insights into all HTML responses:

```javascript
const { speedInsightsInjector } = require('./middlewares/speedInsightsMiddleware');

// Apply globally
app.use(speedInsightsInjector);

// Or apply to specific routes
app.get('/dashboard', speedInsightsInjector, (req, res) => {
  res.send('<html><head><title>Dashboard</title></head><body>...</body></html>');
});
```

## Health Check

The API health check endpoint now includes Speed Insights status:

```bash
GET /api
```

Response:
```json
{
  "success": true,
  "message": "CodeCure Academy API is running",
  "speedInsights": {
    "enabled": true,
    "config": {
      "debug": true,
      "sampleRate": 1
    }
  }
}
```

## Frontend Integration

For the **frontend application** (`/frontend` directory), you should install and configure Speed Insights separately using the React/Vue/framework-specific instructions from the [Vercel Speed Insights documentation](https://vercel.com/docs/speed-insights/quickstart).

Frontend installation example:
```bash
cd frontend
npm install @vercel/speed-insights
```

Then follow the framework-specific setup in the frontend application.

## Dashboard Access

After deploying to Vercel:
1. Enable Speed Insights in your Vercel dashboard
2. Navigate to your project's Speed Insights section
3. View performance metrics (data appears after user visits)

## Documentation

- [Vercel Speed Insights Quickstart](https://vercel.com/docs/speed-insights/quickstart)
- [Speed Insights Configuration](https://vercel.com/docs/speed-insights/package)
- [Speed Insights Metrics](https://vercel.com/docs/speed-insights/metrics)

## Notes

- Speed Insights does not track data in development mode
- Metrics are only collected from browser clients (frontend)
- This is a client-side performance monitoring tool
- For backend performance monitoring, consider using Vercel's Observability features
