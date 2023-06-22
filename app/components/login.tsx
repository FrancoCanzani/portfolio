import { useState, useEffect, useRef } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';

import { auth, signInWithGoogle } from '../../firebase/firebase';

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {user ? (
        <div className='relative' ref={dropdownRef}>
          <button
            className='flex items-center justify-center bg-green-700 px-4 py-2 font-bold text-white hover:bg-red-700'
            onClick={() => setIsOpen(!isOpen)}
          >
            {user.displayName}
          </button>

          {isOpen && (
            <div className='bg-red-300 hover:bg-red-700'>
              <button
                className='absolute right-0 mt-2 block bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-500'
                onClick={handleSignOut}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <button className='mr-2 font-black'>Sign Up</button>
          <button onClick={signInWithGoogle} className='font-black'>
            Login
          </button>
        </>
      )}
    </>
  );
}
