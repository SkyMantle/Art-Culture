import { newsList } from "../data/news.js"

export async function getRandomNewsProps() {
  const randomNews = newsList[Math.floor(Math.random() * newsList.length)]
  return {
    props: {
      randomNews,
      generatedAt: new Date().toISOString(),
    },
  }
}
