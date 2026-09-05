export interface ProjectData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  accent: string;
  order?: number;
}

export interface PostData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover?: string;
  tags: string[];
  published: boolean;
  publishedAt: Date | string;
}

export interface MessageData {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date | string;
}

export interface PageViewPoint {
  _id: string;
  count: number;
}

export interface PostFormValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover: string;
  tags: string;
  published: boolean;
}

export interface ProjectFormValues {
  title: string;
  slug: string;
  description: string;
  stack: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  accent: string;
  order: number;
}