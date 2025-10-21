import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.service';
import { RegisterRequest, LoginRequest, UserDto } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${API_BASE_URL}/users`;

  constructor(private http: HttpClient) { }

  register(request: RegisterRequest): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/register`, request);
  }

  login(request: LoginRequest): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/login`, request);
  }

  getProfile(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/profile/${id}`);
  }
}
