import { getPostData, getAllPostIds } from '@/scripts/posts';
import matter from 'gray-matter';

interface PostParams {
  id: string;
}

export async function generateStaticParams() {
  const postIds = getAllPostIds();
  return postIds.map((item) => ({
    id: item.params.id,
  }));
}

async function getPost(params: string) {
  const post = await getPostData(params);
  const { data, content } = matter(post.contentHtml);

  return {
    id: post.id,
    title: data.title,
    date: data.date,
    contentHtml: content,
  };
}

export default async function Post({ params }: { params: PostParams }) {
  const post = await getPost(params.id);

  return (
    <article className='py-6'>
      <h1 className='text-3xl font-bold uppercase'>{post.title}</h1>
      <h4 className='mb-6 text-xs'>{post.date}</h4>
      <div
        className=''
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
