'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function Comments({ postID }) {
  const [user, setUser] = useState<User | null>(null);
  const [comment, setComment] = useState('');
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
        const querySnapshot = await getDocs(collection(db, 'comments'));
        const commentsData = querySnapshot.docs.map((doc) => doc.data());
        setComments(commentsData);
      } catch (e) {
        console.error('Error retrieving comments: ', e);
      }
    }

    getComments();
  }, []);

  function handleAddComment(e) {
    e.preventDefault();
    const newComment = e.target.elements.comment.value;
    addComment(newComment);
    e.target.comment.value = '';
  }

  async function addComment(newComment) {
    try {
      const userData = {
        displayName: user?.displayName,
        photoURL: user?.photoURL,
      };

      const commentData = {
        userName: userData.displayName,
        userPic: userData.photoURL,
        postId: postID,
        comment: newComment,
      };

      const docRef = await addDoc(collection(db, 'comments'), commentData);
      console.log('Comment posted with ID: ', docRef.id);

      // Fetch the updated comments from the database
      const querySnapshot = await getDocs(collection(db, 'comments'));
      const commentsData = querySnapshot.docs.map((doc) => doc.data());

      // Update the comments state with the latest comments data
      setComments(commentsData);
    } catch (e) {
      console.error('Error adding comment: ', e);
    }
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
