import { getRandomNewsProps } from "../utils/serverProps.js"
import { useTranslations } from 'next-intl'

export const getServerSideProps = getRandomNewsProps

export default function SsrPage({ randomNews, generatedAt }) {
  const t = useTranslations('ssr')
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>{t('title')}</h1>
      <p>{t('generatedAt')}: {new Date(generatedAt).toLocaleString('uk-UA')}</p>
      <article>
        <h2>{randomNews.title}</h2>
        <p>{randomNews.excerpt}</p>
      </article>
    </main>
  )
}
