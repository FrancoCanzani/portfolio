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
      <h1 className='mb-2 text-3xl font-bold uppercase'>{post.title}</h1>
      <h4 className='mb-6 text-xs'>{post.date}</h4>
      <div
        className=''
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
