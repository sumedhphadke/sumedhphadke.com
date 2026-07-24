const DATE_PREFIX = /^\d{4}-\d{2}-\d{2}-/;

/**
 * Blog filenames start with a date so they sort chronologically on disk.
 * URLs don't carry it — `2025-04-10-hello.mdx` is served at `/blog/hello`.
 * Garden and now entries are unaffected; their filenames are already the slug.
 */
export function postSlug(id: string): string {
  return id.replace(DATE_PREFIX, '');
}
