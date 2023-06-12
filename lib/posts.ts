import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface PostData {
  id: string;
  date: Date;
}

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.reduce<PostData[]>((posts, fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Check if the matterResult has data
    if (!matterResult.data) {
      console.log(`Invalid metadata in file: ${fullPath}`);
      return posts; // Exclude this file from the result
    }

    // Combine the data with the id
    const postData: PostData = {
      id,
      date: matterResult.data.date,
    };

    return [...posts, postData];
  }, []);

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
