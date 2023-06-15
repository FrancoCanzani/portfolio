import { getSortedPostsData } from '@/lib/posts';

import Link from 'next/link';
import { Suspense } from 'react';

export default async function Home() {
  const allPostsData = await getSortedPostsData();

  return (
    <section>
      <h1>Blog posts</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ul>
          {allPostsData.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
            </li>
          ))}
        </ul>
      </Suspense>
    </section>
  );
}
