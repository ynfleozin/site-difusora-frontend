import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CurrencyData {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

interface ApiResponse {
  [key: string]: CurrencyData;
}

interface FormattedCurrency {
  moeda: string;
  preco: number;
  icon: string;
  symbol: string;
  change: number;
}

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss',
})
export class CurrenciesComponent implements OnInit {
  private apiData: ApiResponse = {
    USDBRL: {
      code: 'USD',
      codein: 'BRL',
      name: 'Dólar Americano/Real Brasileiro',
      high: '5.627',
      low: '5.51851',
      varBid: '-0.02072',
      pctChange: '-0.371485',
      bid: '5.5569',
      ask: '5.5599',
      timestamp: '1752170054',
      create_date: '2025-07-10 14:54:14',
    },
    EURBRL: {
      code: 'EUR',
      codein: 'BRL',
      name: 'Euro/Real Brasileiro',
      high: '6.57895',
      low: '6.45161',
      varBid: '-0.055207',
      pctChange: '-0.843561',
      bid: '6.48929',
      ask: '6.50618',
      timestamp: '1752169776',
      create_date: '2025-07-10 14:49:36',
    },
    BTCBRL: {
      code: 'BTC',
      codein: 'BRL',
      name: 'Bitcoin/Real Brasileiro',
      high: '629334',
      low: '597782',
      varBid: '30945',
      pctChange: '5.175',
      bid: '628955',
      ask: '628956',
      timestamp: '1752170059',
      create_date: '2025-07-10 14:54:19',
    },
    ETHBRL: {
      code: 'ETH',
      codein: 'BRL',
      name: 'Ethereum/Real Brasileiro',
      high: '15657.04',
      low: '14564.32',
      varBid: '1067.11',
      pctChange: '7.321',
      bid: '15638.63',
      ask: '15639.3',
      timestamp: '1752170061',
      create_date: '2025-07-10 14:54:21',
    },
  };

  cotacoes: FormattedCurrency[] = [];

  ngOnInit(): void {
    this.cotacoes = this.transformApiData(this.apiData);
  }

  private transformApiData(data: ApiResponse): FormattedCurrency[] {
    return Object.values(data).map((currency) => {
      return {
        moeda: currency.name.split('/')[0],
        preco: parseFloat(currency.bid),
        symbol: currency.code,
        change: parseFloat(currency.pctChange) / 100,
        icon: this.getCurrencyIcon(currency.code),
      };
    });
  }


  private getCurrencyIcon(code: string): string {
    const iconMap: { [key: string]: string } = {
      USD: 'assets/svgs/dolar.svg',
      EUR: 'assets/svgs/euro.svg',
      BTC: 'assets/svgs/bitcoin.svg',
      ETH: 'assets/svgs/ethereum.svg',
    };
    return iconMap[code] || 'assets/svgs/default.svg';
  }
}
