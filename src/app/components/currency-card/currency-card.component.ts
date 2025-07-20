import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayCurrency } from '../../models/currency.model';

@Component({
  selector: 'app-currency-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="currency-card">
      <img [src]="currency.icon" [alt]="'Ícone ' + currency.moeda" />
      <div class="info">
        <p class="price">
          {{ currency.preco | currency : 'BRL' : 'symbol' : '1.2-4' }}
        </p>
        <div class="symbol-change">
          <p class="symbol">{{ currency.symbol }}</p>
          <p
            class="change"
            [ngClass]="{
              positive: currency.change >= 0,
              negative: currency.change < 0
            }"
          >
            {{ currency.change >= 0 ? '+' : ''
            }}{{ currency.change | percent : '1.2-2' }}
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './currency-card.component.scss',
})
export class CurrencyCardComponent {
  @Input() currency!: DisplayCurrency;
}
