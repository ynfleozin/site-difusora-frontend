import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestCoffeeQuote } from '../../models/coffee/latest-coffee-quote.model.ts';
import { CoffeeService } from '../../services/coffee.service';

@Component({
  selector: 'app-coffee-quote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coffee-quote.component.html',
  styleUrl: './coffee-quote.component.scss',
})
export class CoffeeQuoteComponent implements OnInit {
  latestQuoteData?: LatestCoffeeQuote;

  constructor(private coffeService: CoffeeService) {}

  ngOnInit(): void {
    this.coffeService.getCoffeeQuotes().subscribe({
      next: (data) => {
        this.latestQuoteData = data;
      },
      error: (err) => {
        console.error('Erro ao buscar cotação de café:', err);
        this.latestQuoteData = undefined;
      },
    });
  }
}
