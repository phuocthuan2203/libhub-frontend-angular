import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.service';
import { BookDto, BookDetailsDto } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = `${API_BASE_URL}/books`;

  constructor(private http: HttpClient) { }

  searchBooks(query: string): Observable<BookDto[]> {
    return this.http.get<BookDto[]>(`${this.apiUrl}/search?query=${encodeURIComponent(query)}`);
  }

  getBookDetailsById(id: string): Observable<BookDetailsDto> {
    return this.http.get<BookDetailsDto>(`${this.apiUrl}/${id}`);
  }
}
