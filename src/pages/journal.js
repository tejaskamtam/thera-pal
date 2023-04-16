import styles from '@/styles/Home.module.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import { OpenAI } from './api/openai.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase.js';
import NavBar from '@/components/NavBar.js';
import ResponsiveAppBar from '@/components/NavBar.js';
import { Box } from '@mui/material';
import { getFirestore, getDoc, doc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router.js';

const db = getFirestore();

export default function Home() {
  const fire_auth = getAuth(app);

  const [auth, setAuth] = useState(null);
  const [userData, setUserData] = useState(null);

  onAuthStateChanged(fire_auth, (data) => {
    console.log(data);
    setAuth(data);
  });
  
  const router = useRouter();

  useEffect(() => {
    if (auth) {
      const user_uid = auth.uid;
      getDoc(doc(db, 'users', user_uid)).then((data) => {
        setUserData(data.data());
      });
    }
  }, [auth]);
  console.log(userData);

  const styles = {
    container: {
      height: '100vh',
      backgroundImage: `url(${'background.jpeg'})`,
      backgroundSize: '100vw',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
  };

  return (
    <>
      <Head>
        <title>TheraPal</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ResponsiveAppBar />
        <Box sx={styles.container}>
          <div>heyy</div>
        </Box>
      </main>
    </>
  );
}
