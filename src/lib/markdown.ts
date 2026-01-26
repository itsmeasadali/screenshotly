import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const contentDirectory = path.join(process.cwd(), 'content');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  htmlContent: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: 'tutorial' | 'guide' | 'news' | 'comparison' | 'tips';
  tags: string[];
  keywords: string[];
  readingTime: number;
  featured?: boolean;
  image?: string;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface Author {
  name: string;
  slug: string;
  bio: string;
  credentials?: string;
  avatar?: string;
  content: string;
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  expertise?: string[];
  company?: {
    name: string;
    url: string;
    role: string;
  };
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const blogDirectory = path.join(contentDirectory, 'blog');
  const filenames = fs.readdirSync(blogDirectory);
  
  const posts = await Promise.all(
    filenames
      .filter(name => name.endsWith('.md'))
      .map(async (filename) => {
        const slug = filename.replace(/\.md$/, '');
        return await getBlogPost(slug);
      })
  );
  
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// Get a single blog post
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(contentDirectory, 'blog', `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process markdown to HTML
    const processedContent = await remark()
      .use(gfm)
      .use(html, { sanitize: false })
      .process(content);
    
    const htmlContent = processedContent.toString();
    
    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content,
      htmlContent,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      author: data.author,
      category: data.category,
      tags: data.tags || [],
      keywords: data.keywords || [],
      readingTime: data.readingTime || calculateReadingTime(content),
      featured: data.featured || false,
      image: data.image,
      faqs: data.faqs || [],
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

// Get all authors
export async function getAllAuthors(): Promise<Author[]> {
  try {
    const authorsDirectory = path.join(contentDirectory, 'authors');
    const filenames = fs.readdirSync(authorsDirectory);
    
    const authors = await Promise.all(
      filenames
        .filter(name => name.endsWith('.md'))
        .map(async (filename) => {
          const slug = filename.replace(/\.md$/, '');
          return await getAuthorBySlug(slug);
        })
    );
    
    return authors.filter((author): author is Author => author !== null);
  } catch (error) {
    console.error('Error reading authors directory:', error);
    return [];
  }
}

// Get author by slug
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const filePath = path.join(contentDirectory, 'authors', `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process markdown to HTML
    const processedContent = await remark()
      .use(gfm)
      .use(html, { sanitize: false })
      .process(content);
    
    return {
      name: data.name,
      slug: data.slug,
      bio: data.bio,
      credentials: data.credentials,
      avatar: data.avatar,
      content: processedContent.toString(),
      social: data.social || {},
      expertise: data.expertise || [],
      company: data.company || {},
    };
  } catch (error) {
    console.error(`Error reading author ${slug}:`, error);
    return null;
  }
}

// Get author information (legacy function)
export async function getAuthor(slug: string): Promise<Author | null> {
  return getAuthorBySlug(slug);
}

// Get featured blog posts
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => post.featured);
}

// Get blog posts by category
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => post.category === category);
}

// Get related blog posts
export async function getRelatedBlogPosts(currentSlug: string, limit = 3): Promise<BlogPost[]> {
  const currentPost = await getBlogPost(currentSlug);
  if (!currentPost) return [];
  
  const allPosts = await getAllBlogPosts();
  
  return allPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => 
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Get all blog post slugs for static generation
export function getAllBlogSlugs(): string[] {
  const blogDirectory = path.join(contentDirectory, 'blog');
  const filenames = fs.readdirSync(blogDirectory);
  
  return filenames
    .filter(name => name.endsWith('.md'))
    .map(name => name.replace(/\.md$/, ''));
}

// Search blog posts
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  const lowercaseQuery = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}
