import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private playerService: PlayerService) {}

  openPlayerInHeader() {
    this.playerService.requestPlay();
  }
}
