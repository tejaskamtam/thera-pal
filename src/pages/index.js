import ResponsiveAppBar from '@/components/NavBar.js';
import { app } from '@/firebase.js';
import styles from '@/styles/Home.module.css';
import { Box, Button, Card, TextField } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router.js';
import { OpenAI } from './api/openai.js';
import { getFirestore, getDoc, doc, setDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import Link from 'next/link.js';

  const db = getFirestore();

export default function Home() {
  const fire_auth = getAuth(app);

  const [auth, setAuth] = useState(null);

  onAuthStateChanged(fire_auth, (data) => {
    console.log(data);
    setAuth(data);
  });

  const [prompts, setPrompts] = useState();
  useEffect(() => {
    if (auth) {
      const user_uid = auth.uid;
      getDoc(doc(db, 'users', user_uid)).then((data) => {
        setPrompts(data.data().prompts);
      });
    }
  }, [auth]);

  console.log(prompts);

  // chat with AI
  let history =[];
  async function onSubmit() {
    const user_prompt = document.getElementById('user-input').value;
    console.log(user_prompt);
<<<<<<< Updated upstream

    setPrompts(...prompts, { role: 'user', content: user_prompt });

    setDoc(doc(db, 'users', fire_auth.user.uid), prompts);

=======
    // TODO: incorporate with state
    
>>>>>>> Stashed changes
    const response = await fetch('./api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: user_prompt.toString(), mem: history }),
    });
    // of return type - {response: {role:"", content:""}}
    const res = await response.json();
    history.push(res.response);
    console.log(history);
    console.log(res);
  }

  // auth  control
  const router = useRouter();

  const styles = {
    container: {
      backgroundImage: `url(${'background.jpeg'})`,
      backgroundSize: '100vw',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
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
          {auth ? (
            <Card
              sx={{
                backgroundColor: 'white',
                height: '90%',
                display: 'flex',
                justifyContent: 'end',
                flexDirection: 'column',
                padding: 1,
              }}
            >
              <Card>text</Card>
              <Card>text</Card>
              <Card>text</Card>
              <Box sx={{ width: '100%' }}>
                <TextField
                  id="user-input"
                  label="Say Something UwU"
                  variant="outlined"
                  sx={{ margin: 1 }}
                />
                <Button sx={{ height: '100%' }} onClick={onSubmit}>
                  Submit
                </Button>
              </Box>
            </Card>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <Button>
                <Link href="/login">Login with Google</Link>
              </Button>
            </Box>
          )}
        </Box>
      </main>
    </>
  );
}
