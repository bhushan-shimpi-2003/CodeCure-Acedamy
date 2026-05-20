/**
 * Speed Insights Middleware
 * 
 * This middleware provides helper functions for injecting Speed Insights
 * into HTML responses when serving web pages from the Express backend.
 * 
 * Usage:
 * const { injectSpeedInsightsScript } = require('./middlewares/speedInsightsMiddleware');
 * 
 * app.get('/some-page', (req, res) => {
 *   const html = `
 *     <!DOCTYPE html>
 *     <html>
 *       <head>
 *         <title>My Page</title>
 *         ${injectSpeedInsightsScript()}
 *       </head>
 *       <body>...</body>
 *     </html>
 *   `;
 *   res.send(html);
 * });
 */

const { getSpeedInsightsScript } = require('../config/speedInsights');

/**
 * Middleware to inject Speed Insights script into HTML responses
 * This is a response interceptor that can be used for routes serving HTML
 */
function speedInsightsInjector(req, res, next) {
  const originalSend = res.send;
  
  res.send = function(data) {
    // Only inject if response is HTML
    const contentType = res.get('Content-Type') || '';
    if (contentType.includes('text/html') && typeof data === 'string') {
      // Inject before closing </head> tag if present
      if (data.includes('</head>')) {
        data = data.replace('</head>', `${getSpeedInsightsScript()}\n</head>`);
      } else if (data.includes('<html>')) {
        // If no </head>, inject after <html>
        data = data.replace('<html>', `<html>\n<head>${getSpeedInsightsScript()}</head>`);
      }
    }
    
    originalSend.call(this, data);
  };
  
  next();
}

/**
 * Helper function to get the Speed Insights script tag
 * Use this in HTML template strings
 * 
 * @returns {string} Speed Insights script tags
 */
function injectSpeedInsightsScript() {
  return getSpeedInsightsScript();
}

module.exports = {
  speedInsightsInjector,
  injectSpeedInsightsScript,
};
