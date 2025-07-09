import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad-banner-horizontal',
  standalone: true,
  imports: [],
  templateUrl: './ad-banner-horizontal.component.html',
  styleUrl: './ad-banner-horizontal.component.scss',
})
export class AdBannerHorizontalComponent {
  @Input() imageUrl!: string;
  @Input() linkUrl: string = '#';
  @Input() altText: string = 'Anúncio';
}
