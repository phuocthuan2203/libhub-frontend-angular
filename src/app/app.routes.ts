import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'books', component: BookSearchComponent },
  { path: 'books/:id', component: BookDetailsComponent }
];
