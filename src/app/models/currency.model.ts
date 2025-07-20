export interface ApiCurrencyData {
  code: string;
  codein: string;
  name: string;
  high: number;
  low: number;
  varBid: number;
  pctChange: number;
  bid: number;
  ask: number;
  timestamp: number;
  create_date: string;
}

export interface ApiResponse {
  [key: string]: ApiCurrencyData;
}

export interface DisplayCurrency {
  moeda: string;
  preco: number;
  icon: string;
  symbol: string;
  change: number;
}
