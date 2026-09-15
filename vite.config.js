import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite's dev server doesn't run the api/ folder the way Vercel does, so mount
 * the handler as middleware. Same file runs in both places.
 */
function apiRoutes(env) {
  return {
    name: 'api-routes',
    configureServer(server) {
      process.env.GROQ_API_KEY ??= env.GROQ_API_KEY
      server.middlewares.use('/api/chat', async (req, res, next) => {
        try {
          const { default: handler } = await server.ssrLoadModule('/api/chat.js')
          await handler(req, res)
        } catch (err) {
          next(err)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return { plugins: [react(), apiRoutes(env)] }
})
