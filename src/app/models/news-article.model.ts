export interface NewsArticle {
  title: string;
  description: string;
  body: string;
  sourceUrl: string;
  sourceName: string;
  publishedAt: string;
  imageUrl: string;
  author?: string;
  category: string;
  slug: string;
}
