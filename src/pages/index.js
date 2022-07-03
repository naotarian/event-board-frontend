import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import indexCss from '../../styles/index.module.css'
import Header from '../components/Parts/Template/Header'

export default function Home() {
  const { user } = useAuth({ middleware: 'guest' })
  return (
    <>
      <Head>
        <title>Laravel</title>
        <link
          href="https://fonts.googleapis.com/css?family=Noto+Sans"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Link href="/result/result_list">
        <a>一覧</a>
      </Link>
    </>
  )
}
