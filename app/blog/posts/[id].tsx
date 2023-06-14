import { getAllPostIds, getPostData } from '@/lib/posts';

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = getPostData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function Post({ params }) {
  const { id } = params;

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
