import { readFile } from 'fs/promises';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    {
      name: 'json-server',
      configureServer(server) {
        server.middlewares.use('/registry', async (req, res) => {
          const filePath = path.resolve(__dirname, 'public/registry.json');
          try {
            const data = await readFile(filePath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to read JSON file' }));
          }
        });
      }
    }
  ]
});
