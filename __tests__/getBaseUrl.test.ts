/** @jest-environment node */
import { getBaseUrl } from '../src/utils/getBaseUrl'

describe('getBaseUrl', () => {
  beforeEach(() => {
    delete (global as any).window
    delete process.env.API_BASE_URL
  })

  afterEach(() => {
    delete (global as any).window
    delete process.env.API_BASE_URL
  })

  describe('browser scenario', () => {
    test('returns window origin when window is defined', () => {
      global.window = { location: { origin: 'https://example.com' } } as any
      process.env.API_BASE_URL = 'https://server.example.com'
      expect(getBaseUrl()).toBe('https://example.com')
    })
  })

  describe('server scenario', () => {
    test('uses API_BASE_URL when window is undefined', () => {
      delete (global as any).window
      process.env.API_BASE_URL = 'https://server.example.com'
      expect(getBaseUrl()).toBe('https://server.example.com')
    })

    test('returns empty string when API_BASE_URL is not set', () => {
      delete (global as any).window
      delete process.env.API_BASE_URL
      expect(getBaseUrl()).toBe('')
    })
  })
})
