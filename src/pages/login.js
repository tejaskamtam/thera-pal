import Link from 'next/link';

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { app } from '../firebase';
import { getFirestore, doc, setDoc } from '@firebase/firestore';
import { useRouter } from 'next/router';

const provider = new GoogleAuthProvider();

const auth = getAuth(app);
auth.languageCode = 'it';

provider.setCustomParameters({
  login_hint: 'user@example.com',
});

const db = getFirestore(app);

const Login = () => {
  const handleSignIn = () => {
    signInWithPopup(auth, provider).then((userCred) => {
      console.log(userCred);
      const userData = {
        name: userCred.user.displayName,
        email: userCred.user.email,
        photo: userCred.user.photoURL,
        journals: [],
        prompts: [],
      };
      setDoc(doc(db, 'users', userCred.user.uid), userData).then(() => {
        router.push('/');
      });
    });
  };

  const handleSignOut = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log(auth);
      })
      .catch((error) => {
        // An error happened.
        console.log(auth);
      });
  };

  const router = useRouter();

  return (
    <div>
      <button onClick={handleSignIn}>login in with google</button>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Login;
