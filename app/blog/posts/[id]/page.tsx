import { getPostData, getAllPostIds } from '@/scripts/posts';

interface PostParams {
  id: string;
  title: string;
  contentHtml: string;
  date: string;
}

export async function generateStaticParams() {
  const postIds = getAllPostIds();
  return postIds.map((item) => ({
    id: item.params.id,
  }));
}

async function getPost(params: string) {
  const post = await getPostData(params);

  return post;
}

export default async function Post({ params }: { params: PostParams }) {
  const post = await getPost(params.id);

  return (
    <article className='py-6'>
      <h1>{post.id}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
