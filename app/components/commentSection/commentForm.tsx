import { collection, addDoc } from 'firebase/firestore';

import { db } from '@/firebase/firebase';

import Image from 'next/image';

import { FormEvent } from 'react';

import { User } from 'firebase/auth';

interface CommentFormProps {
  user: User | null;
  postID: string;
}

export default function CommentForm({ user, postID }: CommentFormProps) {
  async function addComment(newComment: string) {
    try {
      const d = new Date();
      const commentDate = d.toLocaleString('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });

      const commentData = {
        userName: user?.displayName,
        userPic: user?.photoURL,
        userId: user?.uid,
        postId: postID,
        comment: newComment,
        date: commentDate,
      };

      await addDoc(collection(db, 'comments'), commentData);
    } catch (e) {
      console.error('Error adding comment: ', e);
    }
  }

  function handleAddComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newComment = (
      e.currentTarget.elements.namedItem('comment') as HTMLTextAreaElement
    ).value;
    addComment(newComment);
    e.currentTarget.reset();
  }

  return (
    <>
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
        <p className='my-2 capitalize'>
          <span className='font-bold'>Log In</span> to comment
        </p>
      )}
    </>
  );
}
