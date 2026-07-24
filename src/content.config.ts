import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const garden = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/garden' }),
  schema: z.object({
    title: z.string(),
    planted: z.coerce.date(),
    tended: z.coerce.date(),
    stage: z.enum(['seed', 'growing', 'evergreen']),
    tags: z.array(z.string()).default([]),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/now' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['professional', 'personal', 'health', 'learning']),
    ended: z.coerce.date().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({}).optional(),
});

export const collections = { blog, garden, now, work };
