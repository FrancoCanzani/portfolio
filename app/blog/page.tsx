import { getSortedPostsData } from '@/lib/posts';

import Link from 'next/link';

export default async function Home() {
  const allPostsData = await getSortedPostsData();

  return (
    <section>
      <h1>Blog posts</h1>
      <ul>
        {allPostsData.map(({ id, title }) => (
          <li key={id}>
            <Link href={`/blog/posts/${id}`}>{title}</Link>
            <br />
          </li>
        ))}
      </ul>
    </section>
  );
}
