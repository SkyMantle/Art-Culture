import type { AppProps } from 'next/app'
import { NextIntlClientProvider } from 'next-intl'

export default function App({ Component, pageProps }: AppProps<{ locale: string }>) {
  const { locale = 'uk', ...rest } = pageProps
  const messages = require(`../../messages/${locale}.json`)
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Component {...rest} />
    </NextIntlClientProvider>
  )
}
