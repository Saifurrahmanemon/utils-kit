// File: test/mdx-utils.test.ts
import fs from 'fs';
import { describe, expect, test, vi } from 'vitest';

import {
  getMDXData,
  getWritings,
  parseFrontmatter
} from '../src/utils/mdxLoader';

vi.mock('fs');

describe('MDX Parsing and Loading', () => {
  test('should parse frontmatter correctly', () => {
    const mdxContent = `---
title: My Test Blog Post
date: 2024-05-15
---

This is the content of the blog post.`;

    const { metadata, content } = parseFrontmatter(mdxContent);
    expect(metadata.title).toBe('My Test Blog Post');
    expect(metadata.date).toBe('2024-05-15');
    expect(content).toBe('This is the content of the blog post.');
  });

  test('should load MDX data from files', () => {
    (fs.readdirSync as any).mockReturnValue(['test-post.mdx']);
    (fs.readFileSync as any).mockReturnValue(`---
title: Test Post
---
Content of the test post`);

    const mdxData = getMDXData('test/content');
    expect(mdxData).toHaveLength(1);
    expect(mdxData[0].metadata.title).toBe('Test Post');
    expect(mdxData[0].slug).toBe('test-post');
    expect(mdxData[0].content).toBe('Content of the test post');
  });

  test('should get writings from a directory', () => {
    (fs.readdirSync as any).mockReturnValue(['writing1.mdx', 'writing2.mdx']);
    (fs.readFileSync as any).mockImplementation((path: string) => {
      if (path.endsWith('writing1.mdx')) {
        return `---
title: Writing One
---
Content of writing one`;
      } else {
        return `---
title: Writing Two
---
Content of writing two`;
      }
    });

    const writings = getWritings('test/writings');
    expect(writings).toHaveLength(2);
    expect(writings[0].metadata.title).toBe('Writing One');
    expect(writings[1].metadata.title).toBe('Writing Two');
  });
});
