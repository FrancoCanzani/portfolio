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

import LoginButton from './loginButton';

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function that detects the change on the Auth User
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  // Effect to close the dropdown when the mouse is not in the area
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

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
          className='rounded-sm bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-500'
        >
          {user ? user.displayName || 'Logout' : 'Login'}
        </button>

        {isOpen && (
          <div className='bg-red-300 hover:bg-red-700'>
            {user ? (
              <button
                className='absolute right-0 mt-2 block w-24 rounded-sm bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-500'
                onClick={handleSignOut}
              >
                Log Out
              </button>
            ) : (
              <>
                <button
                  className='absolute right-0 mt-2 flex w-60 items-center justify-start rounded-sm bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-500'
                  onClick={signInAsAnonymous}
                >
                  <Image
                    src={'/log in dropdown icons/UserAnonymous.svg'}
                    width={18}
                    height={18}
                    alt='Anonymous icon'
                    className='mr-2'
                  />
                  <span>Continue as Anonymous</span>
                </button>
                <LoginButton
                  provider={'Google'}
                  position={'top-20 mt-2'}
                  event={() => signInWithSocialMedia(googleAuth)}
                  imageURL={'/log in dropdown icons/LogosGoogleIcon.svg'}
                  alt={'Google icon'}
                />
                <LoginButton
                  provider={'Github'}
                  position={'top-28 mt-5'}
                  event={() => signInWithSocialMedia(githubAuth)}
                  imageURL={'/MdiGithub.svg'}
                  alt={'Github icon'}
                />
                <LoginButton
                  provider={'Facebook'}
                  position={'top-40 mt-4'}
                  event={() => signInWithSocialMedia(facebookAuth)}
                  imageURL={'/log in dropdown icons/LogosFacebook.svg'}
                  alt={'Facebook icon'}
                />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
