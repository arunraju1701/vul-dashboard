import {useEffect, useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HomePage from '../components/HomePage'
import Dashboard from '../components/Dashboard'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'


export default function Home({loggedIn}) {
  return (
    <div className={styles.container, styles.main}>
      <Head>
        <title>Cybersafus</title>
        <meta name="description" content="Vulnerability Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     { loggedIn ? <Dashboard/> : <HomePage/>}
    </div>
  )
}

export async function getStaticProps(){
  const loggedIn = false;
  return {
    props: {
      loggedIn
    }
  }
}
