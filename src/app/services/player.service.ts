import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playRequestSource = new Subject<void>();

  playRequest$ = this.playRequestSource.asObservable();

  requestPlay() {
    this.playRequestSource.next();
  }
}
