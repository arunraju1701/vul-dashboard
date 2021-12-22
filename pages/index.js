import {useSession} from 'next-auth/react'
import Layout from '../components/Layout'
import HomePage from '../components/HomePage'
import useRouter from 'next/router'


export default function Home() {

  const { data: session } = useSession();
  if (session) {
    useRouter.push('/products')
  }
  return (
    <Layout>
      <HomePage/>
    </Layout>
  )
}



