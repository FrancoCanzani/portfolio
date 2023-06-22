import { useState, useEffect, useRef } from 'react';
import {
  User,
  onAuthStateChanged,
  signOut,
  signInAnonymously,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

import { auth, signInWithSocialMedia } from '../../../firebase/firebase';

const googleAuth = new GoogleAuthProvider();
const githubAuth = new GithubAuthProvider();
const facebookAuth = new FacebookAuthProvider();

import Image from 'next/image';

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

  function signInAsAnonymous() {
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className='relative' ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-500'
        >
          {user ? user.displayName || 'Logout' : 'Login'}
        </button>

        {isOpen && (
          <div className='bg-red-300 hover:bg-red-700'>
            {user ? (
              <button
                className='absolute right-0 mt-2 block w-24 bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-500'
                onClick={handleSignOut}
              >
                Log Out
              </button>
            ) : (
              <>
                <button
                  className='absolute right-0 mt-2 flex w-52 items-center justify-center bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-500'
                  onClick={signInAsAnonymous}
                >
                  <Image
                    src={'/log in dropdown icons/UserAnonymous.svg'}
                    width={18}
                    height={18}
                    alt='Anonymous icon for sign in anonymously button'
                    className='mr-2'
                  />
                  <span>Login Anonymously</span>
                </button>
                <button
                  className='absolute right-0 top-20 mt-2 flex w-52 items-center justify-center bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-500'
                  onClick={() => signInWithSocialMedia(googleAuth)}
                >
                  <Image
                    src={'/log in dropdown icons/LogosGoogleIcon.svg'}
                    width={18}
                    height={18}
                    alt='Anonymous icon for sign in anonymously button'
                    className='mr-2'
                  />
                  <span>Login With Google</span>
                </button>
                <button
                  className='absolute right-0 top-32 mt-2 flex w-52 items-center justify-center bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-500'
                  onClick={() => signInWithSocialMedia(githubAuth)}
                >
                  <Image
                    src={'/MdiGithub.svg'}
                    width={18}
                    height={18}
                    alt='Anonymous icon for sign in anonymously button'
                    className='mr-2'
                  />
                  <span>Login With GitHub</span>
                </button>
                <button
                  className='absolute right-0 top-44 mt-2 flex w-52 items-center justify-center bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-500'
                  onClick={() => signInWithSocialMedia(facebookAuth)}
                >
                  <Image
                    src={'/log in dropdown icons/LogosFacebook.svg'}
                    width={18}
                    height={18}
                    alt='Anonymous icon for sign in anonymously button'
                    className='mr-2'
                  />
                  <span>Login With Facebook</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
