import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private jsonUrl = 'assets/data/home.json';

  constructor(private http: HttpClient) { }

  getFeatures(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
  
}
