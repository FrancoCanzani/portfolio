import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <section>
      <h1>Blog posts</h1>
      <ul>
        {allPostsData.map(({ id, title }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
          </li>
        ))}
      </ul>
    </section>
  );
}
