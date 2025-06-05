import { NextResponse } from 'next/server'
import { newsList } from '@/data/news'

export async function GET() {
  return NextResponse.json(newsList)
}
