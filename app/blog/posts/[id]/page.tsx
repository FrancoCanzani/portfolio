import { getPostData, getAllPostIds } from '@/scripts/posts';
import Comments from '@/app/components/comments';

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

  return {
    id: post.id,
    title: post.title,
    date: post.date,
    contentHtml: post.contentHtml,
  };
}

export default async function Post({ params }: { params: PostParams }) {
  const post = await getPost(params.id);

  return (
    <section>
      <article className='py-6'>
        <h1 className='text-5xl font-black uppercase'>{post.title}</h1>
        <h4 className='mb-6 text-xs'>{post.date}</h4>
        <div
          className=''
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
      <Comments postID={post.id} />
    </section>
  );
}
