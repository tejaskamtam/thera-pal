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
import LoginIcon from '@mui/icons-material/Login';

const db = getFirestore();
const fire_auth = getAuth(app);
let history = [];

export default function Home() {
  const [auth, setAuth] = useState(null);

  onAuthStateChanged(fire_auth, (data) => {
    if (auth != data) {
      setAuth(data);
    }
  });

  const [prompts, setPrompts] = useState();
  useEffect(() => {
    if (auth && fire_auth.currentUser) {
      const user_uid = fire_auth.currentUser.uid;
      console.log(fire_auth);
      getDoc(doc(db, 'users', user_uid)).then((data) => {
        setPrompts(data.data().prompts);
      });
    }
  }, [auth]);

  console.log(prompts);

  // chat with AI
  async function onSubmit() {
    const user_prompt = document.getElementById('user-input').value;
    console.log(user_prompt);

    console.log(auth.uid);
    history = [...prompts ];
    history.push({ role: 'user', content: user_prompt });

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

    setPrompts([...history]);
    setDoc(doc(db, 'users', auth.uid), { prompts: history }, { merge: true });

    console.log(prompts);
  }

  // auth  control
  const router = useRouter();

  const styles = {
    container: {
      backgroundImage: `url(${'background.jpeg'})`,
      backgroundSize: '100vw',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    
    logo: {
      height: '50vh',
      width: '40vw',
      backgroundImage: `url(${'corgi.gif'})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },

    chat: {
      height: '50vh',
      width: '50vw',
      backgroundImage: `url(${'chat.png'})`,
      backgroundSIze: 'cover',
      backgroundRepeat: 'no-repeat'
    }
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
              {/* {prompts.map((prompt) => {
                  return <Card>{prompt.content}<Card/>
              })} */}
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
              <Box sx={styles.chat}>
              <Button variant = "contained" color = "success" startIcon={<LoginIcon />} sx = {{mt : 28, ml: 19, padding : 3}}>
                <Link href="/login">Login with Google</Link>
              </Button>
              </Box>
            </Box>
          )}
          
          <Box sx={styles.logo}></Box>
          {/* <img src="/Users/kelly/Desktop/hackathon/thera-pal/public/logo.png"></img> */}
        </Box>
      </main>
    </>
  );
}
