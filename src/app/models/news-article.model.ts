export interface NewsArticle {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  categoriy: string;
  publicationDate: string | Date;
}
