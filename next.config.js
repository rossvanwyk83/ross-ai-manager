/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENCLAW_GATEWAY_URL: process.env.OPENCLAW_GATEWAY_URL || 'http://localhost:18790',
    OPENCLAW_AUTH_TOKEN: process.env.OPENCLAW_AUTH_TOKEN || '',
    OPENCLAW_API_KEY: process.env.OPENCLAW_API_KEY || '',
  },
  // Force cache busting for deployment
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
}

module.exports = nextConfig/* Force deployment Wed Feb 25 11:29:55 UTC 2026 */
