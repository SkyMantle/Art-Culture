import { getRandomNewsProps } from "../utils/serverProps.js"

export const getServerSideProps = getRandomNewsProps

export default function SsrPage({ randomNews, generatedAt }) {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>SSR Demo Page</h1>
      <p>Згенеровано на сервері: {new Date(generatedAt).toLocaleString('uk-UA')}</p>
      <article>
        <h2>{randomNews.title}</h2>
        <p>{randomNews.excerpt}</p>
      </article>
    </main>
  )
}
