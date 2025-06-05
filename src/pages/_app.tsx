import type { AppProps } from 'next/app'
import { NextIntlProvider } from 'next-intl'

export default function App({ Component, pageProps }: AppProps<{ locale: string }>) {
  const { locale = 'uk', ...rest } = pageProps
  const messages = require(`../../messages/${locale}.json`)
  return (
    <NextIntlProvider locale={locale} messages={messages}>
      <Component {...rest} />
    </NextIntlProvider>
  )
}
