import { getSortedPostsData } from '@/scripts/posts';
import PostsHome from './postsHome';

export default async function Posts() {
  const allPostsData = getSortedPostsData();

  return <PostsHome allPostsData={allPostsData} />;
}
