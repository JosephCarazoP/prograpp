import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'favicon.ico',
        'favicon.svg',
        'favicon.png',
        'byte-app-icon.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'logo.svg',
        'sql-wasm.wasm'
      ],
      manifest: {
        name: 'PrograApp — Conecta con el Código',
        short_name: 'PrograApp',
        description: 'Plataforma interactiva de aprendizaje de programación en Kotlin y SQL estilo gamificado.',
        theme_color: '#121D28',
        background_color: '#0d151c',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        categories: ['education', 'games'],
        lang: 'es',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,json,wasm}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    }),
    {
      name: 'api-delete-student-dev',
      configureServer(server) {
        server.middlewares.use('/api/delete-student', async (req, res) => {
          if (req.method === 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.statusCode = 200;
            res.end();
            return;
          }
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Method not allowed' }));
            return;
          }

          let body = '';
          req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
          req.on('end', async () => {
            res.setHeader('Content-Type', 'application/json');
            try {
              const parsedBody = JSON.parse(body || '{}');
              const dynamicImport = new Function('specifier', 'return import(specifier)');
              const handlerModule = await dynamicImport('./api/delete-student.js');
              const handler = handlerModule.default || handlerModule;
              const fakeRes = {
                setHeader: (k: string, v: string) => res.setHeader(k, v),
                status: (code: number) => {
                  res.statusCode = code;
                  return fakeRes;
                },
                json: (data: any) => {
                  res.end(JSON.stringify(data));
                },
                end: () => res.end()
              };
              (req as any).body = parsedBody;
              await handler(req as any, fakeRes);
            } catch (importErr: any) {
              res.statusCode = 200;
              res.end(JSON.stringify({
                success: false,
                authDeleted: false,
                message: 'Servidor local: ' + (importErr?.message || 'Configurar credenciales')
              }));
            }
          });
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api/kotlin-compiler': {
        target: 'https://api.kotlinlang.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/kotlin-compiler/, '/api')
      }
    }
  }
});
