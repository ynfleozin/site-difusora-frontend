import { CoffeePrice } from './coffee-price.model';

export interface Quote {
  day: number;
  arabica: CoffeePrice[];
  conilon: CoffeePrice[];
}
