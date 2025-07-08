import { Component } from '@angular/core';

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss'
})
export class CurrenciesComponent {
  cotacoes = [
    {
      moeda: "Dolár",
      preco: 5.4212,
      icon: "assets/svgs/dolar.svg",
      symbol: "USD"
    },
    {
      moeda: "Euro",
      preco: 6.3857,
      icon: "assets/svgs/euro.svg",
      symbol: "EUR"
    },
    {
      moeda: "Bitcoin",
      preco: 586.773,
      icon: "assets/svgs/bitcoin.svg",
      symbol: "BTC"
    },
    {
      moeda: "Etherium",
      preco: 13.667,
      icon: "assets/svgs/etherium.svg",
      symbol: "ETH"
    },

  ]
}
