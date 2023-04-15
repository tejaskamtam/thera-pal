import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {OpenAI} from 'api/openai-api.js';

const inter = Inter({ subsets: ['latin'] })
const openAI = new OpenAI(process.env.OPENAI_API_KEY);

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        Hello
      </main>
    </>
  )
}
