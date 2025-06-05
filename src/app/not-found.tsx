import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        <Link href="/">Return home</Link>
      </p>
    </main>
  )
}
