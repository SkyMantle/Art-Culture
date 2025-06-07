import type { ReactNode } from 'react'
import Script from 'next/script'
import localFont from 'next/font/local'


const firaSans = localFont({
  src: [
    { path: '../../customFonts/FiraSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../customFonts/FiraSans-Bold.ttf',    weight: '700', style: 'normal' },
  ],
  display: 'swap',
})

export const metadata = {
  title: 'Art Play Ukraine',
  description: 'Культура, мистецтво та новини від Art Play Ukraine',
}

interface LocaleLayoutProps {
  children: ReactNode
  params: { locale: string }
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const isProd = process.env.NODE_ENV === 'production'

  return (
    <div lang={locale} className={firaSans.className}>
      {isProd && gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
      {children}
    </div>
  )
}
