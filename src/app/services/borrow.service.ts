import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.service';
import { BorrowRequest, LoanDto } from '../models/borrow.model';

@Injectable({ providedIn: 'root' })
export class BorrowService {
  private apiUrl = `${API_BASE_URL}/borrow`;

  constructor(private http: HttpClient) { }

  borrowBook(request: BorrowRequest): Observable<LoanDto> {
    return this.http.post<LoanDto>(this.apiUrl, request);
  }
}
