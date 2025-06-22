import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Club } from '../models/club/entities/club';


export interface User {
  id: number;
  national_id: string;
  name: string;
  last_name: string;
  phone_number: string;
  email: string;
  username: string;
  password: string;
  enabled: boolean;
  account_non_expired: boolean;
  account_non_locked: boolean;
  credentials_non_expired: boolean;
  affiliation_status: string;
}

// interfaces/role.interface.ts
export interface Role {
  id: number;
  name: string;
}

// interfaces/user-role.interface.ts
export interface UserRole {
  user_id: number;
  role_id: number;
}

// interfaces/user-with-roles.interface.ts
export interface UserWithRoles extends User {
  roles: Role[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private apiUrl = environment.urlServices;

  constructor() { }

  
  getData(endpoint: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${endpoint}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  getUsersByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users?name=${name}`);
  }
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles`);
  }

  getRole(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/roles/${id}`);
  }

  getUserRoles(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${this.apiUrl}/users_roles`);
  }

  getUserRolesByUserId(userId: number): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${this.apiUrl}/users_roles?user_id=${userId}`);
  }

  getUserRolesByRoleId(roleId: number): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${this.apiUrl}/users_roles?role_id=${roleId}`);
  }

  assignRoleToUser(userId: number, roleId: number): Observable<UserRole> {
    return this.http.post<UserRole>(`${this.apiUrl}/users_roles`, {
      user_id: userId,
      role_id: roleId
    });
  }

   getUsersWithRoles(name: string): Observable<UserWithRoles[]> {
    return forkJoin({
      users: this.getUsersByName(name),
      userRoles: this.getData('users_roles'),
      roles: this.getRoles()
    }).pipe(
      map(({ users, userRoles, roles }) => {
        return users.map(user => {
          const userRoleIds = userRoles
            .filter(ur => ur.user_id === user.id)
            .map(ur => ur.role_id);
          
          const userRoles_data = roles.filter(role => 
            userRoleIds.includes(role.id)
          );
          
          return { ...user, roles: userRoles_data };
        });
      })
    );
  }

  getById(endpoint: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${endpoint}/${id}`);
  }

  create(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data);
  }

  update(endpoint: string, id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${endpoint}/${id}`, data);
  }

  delete(endpoint: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${endpoint}/${id}`);
  }

  updateVisibility(id: number, visibility: string): Observable<any> {
    const headers = new HttpHeaders
    ({
      'Content-Type': 'application/json'
    });
    return this.http.patch<any>(`${this.apiUrl}/events/${id}`, { eventVisibility: visibility }, {headers});
  }

  login(username: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}/users?username=${username}&password=${password}`).pipe(
      map(users => users.length > 0 ? users[0] : null)
    );
  }

  getClubAdministratorById(club_administrador_id: number): Observable<Club> {
    return this.http.get<Club>(`${this.apiUrl}/clubs?club_administrator_id=${club_administrador_id}`);
  }


}
