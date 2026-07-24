import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { postSlug } from '../lib/slug';

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error('rss.xml needs `site` set in astro.config.ts.');
  }

  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: 'Writing — Sumedh Phadke',
    description: 'Writing by Sumedh Phadke.',
    site: context.site,
    trailingSlash: false,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${postSlug(post.id)}`,
    })),
  });
}
