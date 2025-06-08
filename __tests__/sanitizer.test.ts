import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
const window = new JSDOM('').window
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DOMPurify = createDOMPurify(window as any)

/** Basic sanitization check */
test('unsafe HTML is sanitized', () => {
  const dirty = '<img src=x onerror=alert(1)><script>alert(1)</script><p>hi</p>'
  expect(DOMPurify.sanitize(dirty)).toBe('<img src="x"><p>hi</p>')
})
