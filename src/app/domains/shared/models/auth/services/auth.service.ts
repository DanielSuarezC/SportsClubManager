import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioLoginDto } from '../dto/UsuarioLoginDto';
import { tokenjwt } from '../tokenjwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.urlServices + 'login';
  http = inject(HttpClient);
  constructor() { 
  }

  public login(usuarioLoginDto: UsuarioLoginDto): Observable<tokenjwt> {
    return this.http.post<tokenjwt>(this.baseUrl, usuarioLoginDto);
  }

  // public login(usuarioLoginDto: UsuarioLoginDto, token: string): Observable<any>{
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.post(this.baseUrl, usuarioLoginDto, { headers });
  // }
}
