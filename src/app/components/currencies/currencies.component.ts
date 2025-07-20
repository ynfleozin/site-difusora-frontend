import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrenciesService } from '../../services/currencies.service';
import { ApiResponse, DisplayCurrency } from '../../models/currency.model';
import { CurrencyCardComponent } from '../currency-card/currency-card.component';

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [CommonModule, CurrencyCardComponent],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss',
})
export class CurrenciesComponent implements OnInit {
  // Lista para o grid do desktop (lista simples)
  cotacoes: DisplayCurrency[] = [];

  // Lista para o carrossel do mobile (lista duplicada)
  cotacoesCarrossel: DisplayCurrency[] = [];

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.currenciesService.getCurrencyQuotes().subscribe({
      next: (apiData) => {
        const singleList = this.transformApiData(apiData);

        this.cotacoes = singleList;

        this.cotacoesCarrossel = [...singleList, ...singleList];
      },
      error: (err) => {
        console.error('Erro ao buscar cotações:', err);
        this.cotacoes = [];
        this.cotacoesCarrossel = [];
      },
    });
  }

  private transformApiData(data: ApiResponse): DisplayCurrency[] {
    return Object.values(data).map((currencyFromApi) => {
      return {
        moeda: currencyFromApi.name.split('/')[0],
        preco: currencyFromApi.bid,
        symbol: currencyFromApi.code,
        change: currencyFromApi.pctChange / 100,
        icon: this.getCurrencyIcon(currencyFromApi.code),
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
