"use client";
// Файл: /src/app/page.tsx

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// Динамічно імпортуємо компонент слайдера (SSR: false)
const MainInstagramSlider = dynamic(
  () =>
    import(
      '@/assets/components/Sliders/MainInstagramSlider/MainInstagramSlider'
    ),
  {
    ssr: false,
    loading: () => <p>Завантаження Instagram-слайдера...</p>,
  }
)

export const metadata = {
  title: 'Головна • Art & Culture',
  description: 'Ласкаво просимо на сайт Art & Culture',
}

export default function HomePage() {
  const { t } = useTranslation()

  // Якщо у вас є реальний API, замініть dummyImages на результат fetch
  const [dummyImages, setDummyImages] = useState<string[]>([])

  useEffect(() => {
    // Наприклад, можна завантажити кілька локальних шляхів або з API
    setDummyImages([
      '/Img/mainInstagramSliderIMG.jpg',
      '/Img/mainInstagramSliderIMG.jpg',
      '/Img/mainInstagramSliderIMG.jpg',
    ])
  }, [])

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>{t('Ласкаво просимо на Art & Culture')}</h1>
      <p>{t('Це демонстраційний блог на Next.js із SSR.')}</p>

      <ul>
        <li>
          <Link href="/news/1">{t('Перша новина')}</Link>
        </li>
        <li>
          <Link href="/news/2">{t('Друга новина')}</Link>
        </li>
      </ul>

      {/* Тут вставляємо Instagram-слайдер */}
      <section style={{ marginTop: '3rem' }}>
        <h2>{t('Наш Instagram')}</h2>
        {/* Передаємо dummyImages у слайдер як проп */}
        {dummyImages.length > 0 ? (
          <MainInstagramSlider images={dummyImages} />
        ) : (
          <p>{t('Завантаження слайдера...')}</p>
        )}
      </section>
    </main>
  )
}
