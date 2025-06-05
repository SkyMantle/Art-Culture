// Файл: /src/app/layout.tsx

import type { ReactNode } from 'react'
import Script from 'next/script'

export const metadata = {
  title: 'Art Play Ukraine',
  description: 'Культура, мистецтво та новини від Art Play Ukraine',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const isProd = process.env.NODE_ENV === 'production'

  return (
    <html lang="en">
      <body>
        {isProd && gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
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
      </body>
    </html>
  )
}

