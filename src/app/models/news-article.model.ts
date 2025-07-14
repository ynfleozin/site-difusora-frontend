export interface NewsArticle {
  title: string;
  contentHTML: string;
  sourceUrl: string;
  sourceName: string;
  publishedAt: string;
  imageUrl?: string;
  author?: string;
  category?: string;
  slug?: string;
}
