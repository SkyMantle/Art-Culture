import Link from 'next/link'
import { NewsItem } from '@/data/news'

export default async function NewsIndex() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
  const res = await fetch(`${baseUrl}/api/news`)
  const newsList: NewsItem[] = await res.json()

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Всі новини</h1>
      <ul className="space-y-4">
        {newsList.map((n) => (
          <li key={n.id} className="border rounded-lg p-4 hover:shadow">
            <Link href={`/news/${n.id}`} className="text-2xl font-semibold text-blue-600 hover:underline">
              {n.title}
            </Link>
            <p className="text-gray-600 mt-2">{n.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

