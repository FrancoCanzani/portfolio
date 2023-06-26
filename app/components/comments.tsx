'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';

import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import {
  collection,
  onSnapshot,
  addDoc,
  where,
  query,
  orderBy,
} from 'firebase/firestore';

export default function Comments({ postID }: { postID: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState([]);

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
          where('postId', '==', postID)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const commentsData = snapshot.docs.map((doc) => doc.data());
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

  async function addComment(newComment: string) {
    try {
      const commentData = {
        userName: user?.displayName,
        userPic: user?.photoURL,
        postId: postID,
        comment: newComment,
        date: new Date(),
      };

      await addDoc(collection(db, 'comments'), commentData);
    } catch (e) {
      console.error('Error adding comment: ', e);
    }
  }

  function handleAddComment(e) {
    e.preventDefault();
    const newComment = e.target.elements.comment.value;
    addComment(newComment);
    e.target.comment.value = '';
  }

  return (
    <section className='my-6'>
      <h1 className='text-5xl font-black uppercase'>Comments</h1>
      {user ? (
        <form
          className='my-4 flex items-center justify-center'
          onSubmit={handleAddComment}
        >
          <textarea
            name='comment'
            required
            id='comment'
            autoComplete='off'
            spellCheck='true'
            placeholder='Share your thoughts'
            className='w-full rounded-sm px-4 py-2'
          />
          <button className='px-4 py-2' type='submit' aria-label='Post comment'>
            <Image
              src={'/postCommentArrow.svg'}
              alt={'Post comment arrow'}
              height={25}
              width={25}
              className='hover:opacity-75'
            />
          </button>
        </form>
      ) : (
        <p className='mt-2 capitalize'>
          <span className='font-bold'>Log In</span> to comment
        </p>
      )}
      <ul>
        {comments.length > 0 &&
          comments.map((comment, index) => (
            <li key={index}>
              <div className='mb-2 flex rounded-sm bg-white p-4'>
                <div className='mr-3 h-full'>
                  <Image
                    src={`${comment.userPic}`}
                    alt='User pic'
                    width={30}
                    height={30}
                    className='rounded-sm'
                  />
                </div>
                <div className='flex flex-col'>
                  <span className='font-bold'>{comment.userName}</span>
                  <p>{comment.comment}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
