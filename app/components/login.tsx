import React, { useEffect, useState } from 'react';
import { signInWithGoogle, getUserDisplayName } from '../../firebase/firebase';

export default function Login() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getUserDisplayName()
      .then((name) => {
        setUserName(name);
        console.log(userName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {userName?.length > 0 ? (
        <p className='font-black'>{userName}</p>
      ) : (
        <button onClick={signInWithGoogle} className='font-black'>
          Google
        </button>
      )}
    </>
  );
}
