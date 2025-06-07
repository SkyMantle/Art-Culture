import { jest } from '@jest/globals';
import { getImageUrl, getFormattedDate, getFormattedTime, getBaseUrl } from '../src/utils/helper.js';

describe('helper utilities', () => {
  beforeEach(() => {
    global.window = {
      location: { hostname: 'localhost', origin: 'http://localhost:3000' },
    };
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:5000';
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
      expect(result).toBe('http://localhost:3000/images/pic.jpg');
    });

    test('uses window origin for non-localhost', () => {
      global.window.location.hostname = 'example.com';
      global.window.location.origin = 'https://example.com';
      const result = getImageUrl('images/pic.jpg');
      expect(result).toBe(`${global.window.location.origin}/images/pic.jpg`);
    });

    test('server-side uses env base url on localhost', () => {
      const originalWindow = global.window;
      delete global.window;
      const result = getImageUrl('images/pic.jpg');
      expect(result).toBe('http://localhost:5000/images/pic.jpg');
      global.window = originalWindow;
    });
  });

  describe('date formatting', () => {
    const date = new Date('2024-06-01T12:34:56Z');
    test('getFormattedDate returns uk-UA date string', () => {
      expect(getFormattedDate(date)).toBe('1 червня 2024 р.');
    });

    test('getFormattedTime returns uk-UA time string', () => {
      expect(getFormattedTime(date)).toBe('15:34');
    });
  });

  describe('getBaseUrl', () => {
    test('returns API url for localhost', () => {
      global.window.location.hostname = 'localhost';
      global.window.location.origin = 'http://localhost:3000';
      process.env.NEXT_PUBLIC_API_URL = 'http://localhost:5000';
      expect(getBaseUrl()).toBe(process.env.NEXT_PUBLIC_API_URL);
    });

    test('returns window origin for remote host', () => {
      global.window.location.hostname = 'example.com';
      global.window.location.origin = 'https://example.com';
      expect(getBaseUrl()).toBe(global.window.location.origin);
    });
  });
});
