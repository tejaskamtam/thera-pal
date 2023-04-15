import Link from 'next/link';

import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from './firebase';

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

const Login = () => {
  return (
    <div>
      <button onClick={handleSignIn}>login in with google</button>
    </div>
  );
};

export default Login;
