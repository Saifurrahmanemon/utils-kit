import { existsSync, promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

const baseUrl = 'http://localhost:5173'; // TODO: add real base url

const itemSchema = z.object({
  name: z.string(),
  dir: z.string(),
  file: z.object({
    name: z.string(),
    content: z.string()
  })
});

const registrySchema = z.array(itemSchema);

export async function fetchRegistry() {
  try {
    const response = await fetch(`${baseUrl}/registry`);
    const data = await response.json();

    return registrySchema.parse(data);
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch registry from ${baseUrl}.`);
  }
}

export async function createDir(cwd: string) {
  const dirPath = path.join(cwd ?? process.cwd(), 'src', 'utils');

  console.log(dirPath);

  if (!existsSync(dirPath)) {
    fs.mkdir(dirPath, { recursive: true });
    return {
      path: dirPath,
      created: true,
      message: `Directory created at ${dirPath}`
    };
  } else {
    return {
      path: dirPath,
      created: false,
      message: `Already exist at ${dirPath}`
    };
  }
}
