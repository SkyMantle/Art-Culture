'use client'

import Link from 'next/link'

export default function GlobalError() {
  return (
    <html lang="uk">
      <body style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
        <h1>Щось пішло не так…</h1>
        <p>
          Спробуйте перезавантажити сторінку або перейдіть на{' '}
          <Link href="/">головну</Link>.
        </p>
      </body>
    </html>
  )
}
