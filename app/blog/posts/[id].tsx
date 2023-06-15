import { getPostData, getAllPostIds } from '@/lib/posts';

export async function generateStaticParams() {
  const allPostIds = getAllPostIds();
  return allPostIds;
}

async function getPost(params) {
  const post = await getPostData(params);

  return post;
}

export default async function Post(params) {
  const post = await getPost(params.id);

  return (
    <article>
      <h1>{post.id}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
