'use client';

import { useState, useEffect } from 'react';

import CommentForm from './commentForm';

import Image from 'next/image';

import { User, onAuthStateChanged } from 'firebase/auth';

import { auth, db } from '../../../firebase/firebase';
import {
  collection,
  onSnapshot,
  where,
  query,
  orderBy,
} from 'firebase/firestore';

interface CommentData {
  userName: string;
  userPic: string;
  userId: string;
  postId: string;
  comment: string;
  date: string;
}

export default function Comments({ postID }: { postID: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);

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
    async function getComments() {
      try {
        const q = query(
          collection(db, 'comments'),
          where('postId', '==', postID),
          orderBy('date', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const commentsData = snapshot.docs.map(
            (doc) => doc.data() as CommentData
          );
          setComments(commentsData);
        });

        // Unsubscribe from the snapshot listener when the component unmounts or when postID changes.
        return () => unsubscribe();
      } catch (e) {
        console.error('Error retrieving comments: ', e);
      }
    }

    getComments();
  }, [postID]);

  return (
    <section className='my-6'>
      <h1 className='text-5xl font-black uppercase'>Comments</h1>
      <CommentForm user={user} postID={postID} />
      <ul>
        {comments.length > 0 &&
          comments.map((comment, index) => (
            <li key={index}>
              <div className='mb-2 flex flex-col rounded-sm bg-white p-4'>
                <div className='mr-3 flex items-center'>
                  <Image
                    src={
                      comment.userPic == null
                        ? '/loginIcons/UserAnonymousDark.svg'
                        : comment.userPic
                    }
                    alt='User pic'
                    width={30}
                    height={30}
                    className='mr-3 rounded-sm'
                  />
                  <div className='flex flex-col'>
                    <span className='font-bold'>
                      {comment.userName == null
                        ? 'Anonymous'
                        : comment.userName}
                    </span>
                    <span className='text-xs font-light'>{comment.date}</span>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <p className='mt-3 pl-10'>{comment.comment}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
