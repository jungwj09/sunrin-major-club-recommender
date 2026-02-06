import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '선린인터넷고등학교 전공동아리 추천',
  description: 'AI 기반 선린인터넷고등학교 전공동아리 추천 시스템',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}