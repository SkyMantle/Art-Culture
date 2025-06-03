import { jest } from '@jest/globals';
import { getImageUrl, getFormattedDate, getFormattedTime } from '../src/utils/helper.js';

describe('helper utilities', () => {
  beforeEach(() => {
    global.window = { location: { hostname: 'localhost' } };
  });

  describe('getImageUrl', () => {
    test('returns default image when no path provided', () => {
      expect(getImageUrl()).toBe('/img/placeholder.jpg');
    });

    test('returns absolute url unchanged', () => {
      const url = 'https://example.com/img.png';
      expect(getImageUrl(url)).toBe(url);
    });

    test('normalizes relative paths', () => {
      const result = getImageUrl('images/pic.jpg');
      expect(result).toBe('http://localhost:5000/images/pic.jpg');
    });
  });

  describe('date formatting', () => {
    const date = new Date('2024-06-01T12:34:56Z');
    test('getFormattedDate returns uk-UA date string', () => {
      expect(getFormattedDate(date)).toBe('1 червня 2024 р.');
    });

    test('getFormattedTime returns uk-UA time string', () => {
      expect(getFormattedTime(date)).toBe('12:34');
    });
  });
});
