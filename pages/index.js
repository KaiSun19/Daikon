import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Typography } from '@mui/material'
import Welcome from './Components/Welcome'
import { DaikonProvider } from '../Context'
import DaikonUI from './Components/DaikonUI'
import { addQuery } from '../firebaseHelpers'


export default function Home() {
  
  return (
    <>
      <Head>
        <title>Daikon</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <DaikonProvider>
        <Welcome />
      </DaikonProvider>
    </>
  )
}
