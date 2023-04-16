import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '@/firebase';
import Link from 'next/link';
import { getFirestore, getDoc, doc, setDoc } from '@firebase/firestore';

const db = getFirestore();

function ResponsiveAppBar() {

    const fire_auth = getAuth(app);

    const [auth, setAuth] = React.useState(null);
    const [userData, setUserData] = React.useState(null);

    onAuthStateChanged(fire_auth, (data) => {
      console.log(data);
      setAuth(data);
    });

    React.useEffect(() => {
      if (auth) {
        const user_uid = auth.uid;
        getDoc(doc(db, 'users', user_uid)).then((data) => {
          setUserData(data.data());
        });
      }
    }, [auth]);
    console.log(userData);

      const handleSignOut = async () => {
        signOut(fire_auth)
          .then(() => {
            // Sign-out successful.
            console.log(auth);
          })
          .catch((error) => {
            // An error happened.
            console.log(auth);
          });
      };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TheraPal
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex' },
              display: 'flex',
              justifyContent: 'end',
              marginRight: '15px',
            }}
          >
            {/* <Link href="/journal">Journal</Link> */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }} onClick={handleSignOut}>
                <Avatar alt="Remy Sharp" src={userData?.photo} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
