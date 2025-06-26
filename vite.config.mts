import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import devCerts from 'office-addin-dev-certs';
import fs from 'fs';
import path from 'path';

export default defineConfig(async () => {
  const httpsOptions = await devCerts.getHttpsServerOptions();

  return {
    plugins: [react()],
    root: 'src/taskpane',
    base: '/',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      https: {
        key: httpsOptions.key,
        cert: httpsOptions.cert,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  };
});
