import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private readonly UNSPLASH_ACCESS_KEY = 'MKs4aTgMtVvZR6RbcXUBwsHCLGnTPyc3qMvbxQgKyCY';
  private readonly UNSPLASH_API_URL = 'https://api.unsplash.com';
  

  private sportsTerms = [
   'chess'
  ];

  constructor(private http: HttpClient) {}

  getRandomSportsImage(): Observable<UnsplashImage> {
    const randomTerm = this.sportsTerms[Math.floor(Math.random() * this.sportsTerms.length)];
    
    return this.http.get<UnsplashImage>(
      `${this.UNSPLASH_API_URL}/photos/random`,
      {
        params: {
          query: randomTerm,
          client_id: this.UNSPLASH_ACCESS_KEY,
          orientation: 'landscape'
        }
      }
    );
  }
}
