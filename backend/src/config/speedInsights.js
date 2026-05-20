/**
 * Vercel Speed Insights Configuration
 * 
 * Speed Insights tracks frontend performance metrics (Core Web Vitals).
 * This module provides the configuration setup for the Speed Insights package.
 * 
 * Note: Speed Insights is primarily designed for frontend applications that serve HTML.
 * This backend is a REST API that serves JSON responses. The configuration is provided
 * here for reference and can be used if this backend ever serves HTML pages.
 * 
 * For frontend monitoring, Speed Insights should be installed in the frontend application.
 */

const { injectSpeedInsights } = require('@vercel/speed-insights');

/**
 * Speed Insights configuration options
 */
const speedInsightsConfig = {
  debug: process.env.NODE_ENV === 'development',
  sampleRate: parseFloat(process.env.SPEED_INSIGHTS_SAMPLE_RATE || '1'),
  // DSN is only required when self-hosting
  // dsn: process.env.VERCEL_SPEED_INSIGHTS_DSN,
};

/**
 * Initialize Speed Insights
 * Call this function in any HTML-serving routes if needed
 * 
 * @returns {Object|null} Speed Insights instance or null
 */
function initSpeedInsights() {
  // Speed Insights only works in browser environments
  if (typeof window !== 'undefined') {
    return injectSpeedInsights(speedInsightsConfig);
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[Speed Insights] Configuration ready. Available for browser-based pages.');
  }
  
  return null;
}

/**
 * Get Speed Insights script injection code for HTML templates
 * Use this if you need to manually inject the script into HTML responses
 * 
 * @returns {string} HTML script tag for Speed Insights
 */
function getSpeedInsightsScript() {
  return `
    <script>
      window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
    </script>
    <script defer src="/_vercel/speed-insights/script.js"></script>
  `.trim();
}

module.exports = {
  speedInsightsConfig,
  initSpeedInsights,
  getSpeedInsightsScript,
};
