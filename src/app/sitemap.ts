import { MetadataRoute } from 'next';
import { useCases } from '@/data/use-cases';
import { integrations } from '@/data/integrations';
import { comparisons } from '@/data/comparisons';
import { getAllBlogPosts } from '@/lib/markdown';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/playground`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/help`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/gdpr`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/status`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.5,
    },
  ];

  // Index pages for pSEO sections
  const indexPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/use-cases`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/integrations`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Use case pages (pSEO) - from data
  const useCasePages: MetadataRoute.Sitemap = useCases.map((useCase) => ({
    url: `${BASE_URL}/use-cases/${useCase.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Integration pages (pSEO) - from data
  const allIntegrations = [...integrations.languages, ...integrations.platforms];
  const integrationPages: MetadataRoute.Sitemap = allIntegrations.map((integration) => ({
    url: `${BASE_URL}/integrations/${integration.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Comparison pages (pSEO) - from data
  const comparisonPages: MetadataRoute.Sitemap = comparisons.map((comparison) => ({
    url: `${BASE_URL}/compare/${comparison.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog pages - from markdown files
  const blogPosts = await getAllBlogPosts();
  const blogPagesList: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...indexPages,
    ...useCasePages,
    ...integrationPages,
    ...comparisonPages,
    ...blogPagesList,
  ];
}
