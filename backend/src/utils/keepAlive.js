/**
 * keepAlive.js — Optional keep-alive cron job
 *
 * Pings KEEP_ALIVE_URL every 5 minutes so the server does not sleep
 * on free-tier hosting providers (e.g., Render free tier).
 *
 * Enable by setting in your .env:
 *   KEEP_ALIVE_ENABLED=true
 *   KEEP_ALIVE_URL=https://your-deployed-backend.com/health
 *
 * ⚠️  Important: This job runs INSIDE the same server process.
 *     On providers that sleep the entire dyno/container, this job will
 *     also sleep and therefore CANNOT wake the server up by itself.
 *     For true uptime, configure an external monitor such as:
 *       - https://uptimerobot.com
 *       - https://betterstack.com
 *       - https://cron-job.org
 */

const INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Starts the keep-alive interval timer.
 * Safe to call multiple times — only starts if KEEP_ALIVE_ENABLED=true.
 */
function startKeepAlive() {
  const enabled = process.env.KEEP_ALIVE_ENABLED === 'true';

  if (!enabled) {
    console.log('[KeepAlive] Disabled. Set KEEP_ALIVE_ENABLED=true to enable.');
    return;
  }

  const url = process.env.KEEP_ALIVE_URL;

  if (!url) {
    console.warn('[KeepAlive] KEEP_ALIVE_ENABLED is true but KEEP_ALIVE_URL is not set. Skipping.');
    return;
  }

  console.log(`[KeepAlive] Started. Pinging ${url} every 5 minutes.`);

  const ping = async () => {
    try {
      const response = await fetch(url, { method: 'GET' });
      if (response.ok) {
        console.log(`[KeepAlive] ✅ Ping successful — ${new Date().toISOString()} (status ${response.status})`);
      } else {
        console.warn(`[KeepAlive] ⚠️  Ping returned non-OK status ${response.status} — ${new Date().toISOString()}`);
      }
    } catch (err) {
      // Never crash the server — just log the failure
      console.error(`[KeepAlive] ❌ Ping failed — ${new Date().toISOString()} — ${err.message}`);
    }
  };

  // Kick off the interval
  setInterval(ping, INTERVAL_MS);
}

module.exports = { startKeepAlive };
