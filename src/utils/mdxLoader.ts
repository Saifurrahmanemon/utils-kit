import fs from 'fs';
import path from 'path';

/**
 * inspiration from  - https://github.com/leerob/leerob.io/blob/9566a4fe599a3a24b9264420ea2490f28e921887/app/db/blog.ts
 * MDX Utils: Load, Parse, and Extract Data from MDX Files
 *
 * This module provides functions to read, parse, and extract metadata and content
 * from Markdown with JSX (MDX) files.
 *
 * Key Features:
 * - Frontmatter Parsing: Extracts metadata from the YAML-like frontmatter block at the beginning of MDX files.
 * - MDX File Discovery: Finds all MDX files in a specified directory (or subdirectories).
 * - Data Extraction: Combines metadata, content, and filename-derived slugs for easy consumption.
 *
 * How to Use:
 *
 * 1. Installation (if not part of your project already):
 *
 *    npm install fs path
 *
 *
 * 2. Import the Functions:
 *
 *    import { getWritings } from './utils/mdxLoader'; // Adjust the path as needed
 *
 *
 * 3. Prepare MDX Files:
 *    - Create MDX files with frontmatter in a directory (e.g., 'blog').
 *    - Frontmatter should use YAML format, enclosed between '---' delimiters:
 *
 *      ---
 *      title: My Blog Post
 *      date: 2023-12-15
 *      tags: technology, webdev
 *      ---
 *
 *      This is the content of my blog post.
 *
 *
 * 4. Retrieve MDX Data:
 *
 *    const writings = getWritings('blog'); // Replace 'blog' with your directory
 *
 *    - `writings` will be an array of objects, each containing:
 *      - `slug`: Filename without extension (e.g., 'my-blog-post')
 *      - `metadata`: An object with frontmatter properties (e.g., `{ title: 'My Blog Post', date: '2023-12-15', tags: 'technology, webdev' }`)
 *      - `content`: The MDX content without frontmatter
 *
 * Advanced Usage:
 * - `getMDXData(dir)`: For more control, use this function to specify any directory path directly.
 * - `readMDXFile(filePath)`: Directly read and parse a single MDX file by its path.
 * - `parseFrontmatter(content)`: Extract metadata if you already have the MDX content.
 *
 * Note: This module uses synchronous file operations, which might not be ideal for large directories.
 */

// define your metadata  types
type Metadata = Record<string, string | undefined>;

export function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, '').trim();
  let frontMatterLines = frontMatterBlock.trim().split('\n');
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1');
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
}

export function getMDXFiles(dir: fs.PathLike) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

export function readMDXFile(filePath: fs.PathOrFileDescriptor) {
  let rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

export function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const content = readMDXFile(path.join(dir, file));

    let slug = path.basename(file, path.extname(file));
    return {
      ...content,
      slug
    };
  });
}

// name it as per your requirement
export function getWritings(dirName: string) {
  return getMDXData(path.join(process.cwd(), dirName));
}
