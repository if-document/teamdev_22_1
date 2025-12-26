// types/Post.ts
export type Post = {
  id: number;
  title: string;
  category: string;
  author: string;
  createdAt: string;
  imageUrl?: string;
  excerpt: string;
};

export type DbPost = {
  id: number;
  user_id: string;
  category_id: number;
  title: string;
  content: string;
  image_path: string;
  created_at: string;
  updated_at: string;
  users?: {
    name: string;
  };
};
