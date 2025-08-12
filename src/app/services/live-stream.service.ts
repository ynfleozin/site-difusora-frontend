import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment-development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LiveStreamService {
  private readonly apiUrl = environment.apiUrl + '/live-stream';

  constructor(private http: HttpClient) {}

  getLiveLink(): Observable<{ liveLink: string | null }> {
    return this.http.get<{ liveLink: string | null }>(this.apiUrl);
  }

  setLiveLink(link: string) {
    return this.http.post(this.apiUrl, { liveLink: link });
  }

  removeLiveLink() {
    return this.http.delete(this.apiUrl);
  }
}
