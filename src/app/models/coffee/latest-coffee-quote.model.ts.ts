import { Quote } from './quote.model';

export interface LatestCoffeeQuote {
  harvest: string;
  quote: Quote;
  scrapedAt: Date;
}
