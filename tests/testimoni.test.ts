import { describe, it, expect } from 'vitest';
import {
  TESTIMONI,
  TESTIMONI_BY_SOURCE,
  TESTIMONI_HIGHLIGHTS,
  SOURCE_LABELS,
  instagramEmbedSrc,
  instagramPermalink,
} from '@/data/testimoni';

const REEL_IDS = [
  'ig-reel-borong-sold-out',
  'ig-reel-gemar-ikan-2024',
  'ig-reel-perjalanan-reseller',
] as const;

const EXPECTED_POST_IDS: Record<(typeof REEL_IDS)[number], string> = {
  'ig-reel-borong-sold-out': 'DFjlct6q4j-',
  'ig-reel-gemar-ikan-2024': 'C776WstAm_y',
  'ig-reel-perjalanan-reseller': 'CvcOHGugAve',
};

describe('Instagram Reel testimoni entries', () => {
  it('all three reels are present in TESTIMONI', () => {
    for (const id of REEL_IDS) {
      expect(TESTIMONI.some((t) => t.id === id), `missing entry ${id}`).toBe(
        true
      );
    }
  });

  it('each reel uses instagram media of kind "reel" with the expected postId', () => {
    for (const id of REEL_IDS) {
      const t = TESTIMONI.find((x) => x.id === id);
      expect(t, `entry ${id} not found`).toBeDefined();
      expect(t!.source).toBe('instagram');
      expect(t!.media.type).toBe('instagram');
      if (t!.media.type === 'instagram') {
        expect(t!.media.kind).toBe('reel');
        expect(t!.media.postId).toBe(EXPECTED_POST_IDS[id]);
      }
    }
  });

  it('every reel has a human-readable platform label and excerpt', () => {
    for (const id of REEL_IDS) {
      const t = TESTIMONI.find((x) => x.id === id)!;
      expect(t.platform).toMatch(/Instagram/i);
      expect(t.excerpt && t.excerpt.length).toBeGreaterThan(20);
    }
  });

  it('reels are grouped under the instagram source bucket', () => {
    const igIds = TESTIMONI_BY_SOURCE.instagram.map((t) => t.id);
    for (const id of REEL_IDS) {
      expect(igIds).toContain(id);
    }
  });

  it('reels are NOT accidentally promoted to homepage highlights', () => {
    const highlightIds = TESTIMONI_HIGHLIGHTS.map((t) => t.id);
    for (const id of REEL_IDS) {
      expect(highlightIds).not.toContain(id);
    }
  });
});

describe('TESTIMONI data integrity', () => {
  it('has no duplicate ids', () => {
    const ids = TESTIMONI.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every entry has id, media, source, platform', () => {
    for (const t of TESTIMONI) {
      expect(t.id, 'id').toBeTruthy();
      expect(t.media, `${t.id}.media`).toBeTruthy();
      expect(t.source, `${t.id}.source`).toBeTruthy();
      expect(t.platform, `${t.id}.platform`).toBeTruthy();
    }
  });

  it('TESTIMONI_BY_SOURCE partitions every entry exactly once', () => {
    const grouped = Object.values(TESTIMONI_BY_SOURCE).reduce(
      (n, arr) => n + arr.length,
      0
    );
    expect(grouped).toBe(TESTIMONI.length);
  });

  it('SOURCE_LABELS covers every source actually used', () => {
    for (const t of TESTIMONI) {
      expect(SOURCE_LABELS[t.source]).toBeTruthy();
    }
  });
});

describe('instagramEmbedSrc / instagramPermalink (pure URL builders)', () => {
  it('builds reel embed URLs', () => {
    expect(instagramEmbedSrc('DFjlct6q4j-', 'reel')).toBe(
      'https://www.instagram.com/reel/DFjlct6q4j-/embed/'
    );
  });

  it('builds post embed URLs and defaults to post', () => {
    expect(instagramEmbedSrc('ABC', 'post')).toBe(
      'https://www.instagram.com/p/ABC/embed/'
    );
    expect(instagramEmbedSrc('ABC')).toBe(
      'https://www.instagram.com/p/ABC/embed/'
    );
  });

  it('builds permalinks for reel and post', () => {
    expect(instagramPermalink('DFjlct6q4j-', 'reel')).toBe(
      'https://www.instagram.com/reel/DFjlct6q4j-/'
    );
    expect(instagramPermalink('ABC')).toBe('https://www.instagram.com/p/ABC/');
  });

  it('embed URL is the permalink with `embed/` appended', () => {
    expect(instagramEmbedSrc('X', 'reel')).toBe(
      instagramPermalink('X', 'reel') + 'embed/'
    );
    expect(instagramEmbedSrc('Y', 'post')).toBe(
      instagramPermalink('Y', 'post') + 'embed/'
    );
  });

  it('preserves shortcodes that contain trailing dashes (e.g. DFjlct6q4j-)', () => {
    const url = instagramEmbedSrc('DFjlct6q4j-', 'reel');
    expect(url).toContain('DFjlct6q4j-/embed/');
  });
});
