// src/app/news/[id]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
const window = new JSDOM('').window
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DOMPurify = createDOMPurify(window as any)
import { NewsItem } from '@/data/news'

// Incremental static regeneration
export const revalidate = 60

interface Props {
  params: { id: string }
}

export async function generateStaticParams() {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_BASE_URL
      : 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/news`)
  const newsList: NewsItem[] = await res.json()
  return newsList.map((n) => ({ id: n.id }))
}

export async function generateMetadata({ params }: Props) {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_BASE_URL
      : 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/news`)
  const newsList: NewsItem[] = await res.json()
  const news = newsList.find((n) => n.id === params.id)
  if (!news) return {}
  return {
    title: `${news.title} · Art & Culture`,
    description: news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      images: ['/og-news.png'],
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

export default async function NewsPage({ params }: Props) {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_BASE_URL
      : 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/news`)
  const newsList: NewsItem[] = await res.json()
  const news = newsList.find((n) => n.id === params.id) as NewsItem
  if (!news) notFound()
  const sanitizedContent = DOMPurify.sanitize(news.content)

  return (
    <article className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
      <p className="italic text-gray-700 mb-6">{news.excerpt}</p>
      <div
        className="prose prose-blue"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
      {/* Ось цей Link — і він точно працюватиме */}
      <p className="mt-8">
        <Link href="/news" className="text-blue-600 hover:underline">
          ← Повернутися до списку новин
        </Link>
      </p>
    </article>
  )
}


