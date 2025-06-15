import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ClubAdministrator } from '../../member/entities/ClubAdministrator';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  baseUrl = environment.urlServices + 'api/club-administrators';

  constructor() { }
/* 
  public create(createClienteDto: CreateClienteDto, token: string | undefined): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.baseUrl, createClienteDto, { headers });    
  }

  public findAll(token: string | undefined): Observable<Pagination<Cliente>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });
    return this.http.get<Pagination<Cliente>>(this.baseUrl, { headers });
  }

  public findOne(idCliente: string, token: string | undefined): Observable<Cliente> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Cliente>(this.baseUrl + '/' + idCliente, { headers });
  }

  public update(idCliente: string, updateClienteDto: UpdateClienteDto, token: string | undefined): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });
    return this.http.put(this.baseUrl + '/' + idCliente, updateClienteDto, { headers });
  } */

  public getByUsername(username: string, token: string):Observable<ClubAdministrator>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });
    return this.http.get<ClubAdministrator>(this.baseUrl +'/username/' + username, { headers });
  }
}
