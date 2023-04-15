import Link from 'next/link';

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { app } from '../firebase';

const provider = new GoogleAuthProvider();

const auth = getAuth(app);
auth.languageCode = 'it';

provider.setCustomParameters({
  login_hint: 'user@example.com',
});

const handleSignIn = async () => {
  const userCred = await signInWithPopup(auth, provider);
  console.log(userCred);
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
}

const Login = () => {
  return (
    <div>
      <button onClick={handleSignIn}>login in with google</button>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Login;
