import { describe, expect, it } from 'vitest';
import { cloudProviders } from '@/data/cloudProviders';
import { languages } from '@/lib/languages';
import { ALL_ROUTES, getHeadTags, getPageSeo, resolveRoute } from '@/lib/seo';

describe('resolveRoute', () => {
  it('knows the home page and every provider page', () => {
    expect(resolveRoute('/')?.kind).toBe('home');
    expect(resolveRoute('/#pricing')?.kind).toBe('home');
    for (const p of cloudProviders) expect(resolveRoute(`/provider/${p.id}`)?.kind).toBe('provider');
  });

  it('returns null for anything else (served as a real 404)', () => {
    expect(resolveRoute('/provider/nope')).toBeNull();
    expect(resolveRoute('/pricing')).toBeNull();
  });
});

describe('getPageSeo', () => {
  const all = languages.flatMap((l) => ALL_ROUTES.map((r) => getPageSeo(resolveRoute(r)!, l.code)));

  it('produces unique, slash-consistent canonicals', () => {
    const canonicals = all.map((s) => s.canonical);
    expect(new Set(canonicals).size).toBe(canonicals.length);
    for (const c of canonicals) expect(new URL(c).pathname === '/' || !c.endsWith('/')).toBe(true);
  });

  it('lists every language plus x-default, including itself', () => {
    for (const s of all) {
      expect(s.alternates).toHaveLength(languages.length + 1);
      expect(s.alternates.some((a) => a.href === s.canonical)).toBe(true);
    }
  });

  it('keeps titles and descriptions within snippet length', () => {
    for (const s of all) {
      expect(s.title.length).toBeLessThanOrEqual(70);
      expect(s.description.length).toBeLessThanOrEqual(160);
    }
  });

  it('emits one canonical and one description per page', () => {
    const tags = getHeadTags(all[0]);
    expect(tags.filter((t) => t.attrs.rel === 'canonical')).toHaveLength(1);
    expect(tags.filter((t) => t.attrs.name === 'description')).toHaveLength(1);
  });
});
