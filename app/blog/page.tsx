import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <section>
      <p>
        Hello, I’m <strong>Shu</strong>. I’m a software engineer and a
        translator (English/Japanese). You can contact me on{' '}
        <a href='https://twitter.com/chibicode'>Twitter</a>.
      </p>
      <p>
        (This is a sample website - you’ll be building a site like this in{' '}
        <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
      </p>

      <h2>Blog</h2>
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
