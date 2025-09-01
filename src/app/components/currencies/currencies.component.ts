import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CurrenciesService } from '../../services/currencies.service';
import { ApiResponse, DisplayCurrency } from '../../models/currency.model';
import { CurrencyCardComponent } from '../currency-card/currency-card.component';

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [CommonModule, CurrencyCardComponent],
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('carousel') carouselEl!: ElementRef<HTMLDivElement>;

  cotacoes: DisplayCurrency[] = [];
  cotacoesCarrossel: DisplayCurrency[] = [];

  constructor(
    private currenciesService: CurrenciesService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener(
        'visibilitychange',
        this.handleVisibilityChange
      );
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener(
        'visibilitychange',
        this.handleVisibilityChange
      );
    }
  }

  private handleVisibilityChange = (): void => {
    if (
      isPlatformBrowser(this.platformId) &&
      !document.hidden &&
      this.carouselEl
    ) {
      this.restartCarouselAnimation();
    }
  };

  private restartCarouselAnimation(): void {
    const carousel = this.carouselEl.nativeElement;
    carousel.classList.remove('animate-carousel');
    void carousel.offsetWidth;
    carousel.classList.add('animate-carousel');
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
