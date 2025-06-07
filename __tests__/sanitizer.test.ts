import DOMPurify from 'isomorphic-dompurify'

/** Basic sanitization check */
test('unsafe HTML is sanitized', () => {
  const dirty = '<img src=x onerror=alert(1)><script>alert(1)</script><p>hi</p>'
  expect(DOMPurify.sanitize(dirty)).toBe('<img src="x"><p>hi</p>')
})
