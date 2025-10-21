import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { BorrowService } from '../../services/borrow.service';
import { BookDetailsDto, CopyDto } from '../../models/book.model';
import { BorrowRequest } from '../../models/borrow.model';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book: BookDetailsDto | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  borrowingCopyId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private borrowService: BorrowService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.loadBookDetails(bookId);
    } else {
      this.errorMessage = 'Invalid book ID';
      this.isLoading = false;
    }
  }

  loadBookDetails(bookId: string): void {
    this.bookService.getBookDetailsById(bookId).subscribe({
      next: (book) => {
        this.book = book;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load book details. Please try again.';
        this.isLoading = false;
      }
    });
  }

  borrow(copyId: string): void {
    this.borrowingCopyId = copyId;
    this.errorMessage = '';
    this.successMessage = '';

    const borrowRequest: BorrowRequest = { copyId };

    this.borrowService.borrowBook(borrowRequest).subscribe({
      next: (loan) => {
        this.successMessage = 'Book borrowed successfully!';
        this.borrowingCopyId = null;
        if (this.book) {
          this.loadBookDetails(this.book.id);
        }
      },
      error: (error) => {
        this.borrowingCopyId = null;
        if (error.status === 403) {
          this.errorMessage = 'You have reached your borrowing limit or this book is no longer available.';
        } else if (error.status === 404) {
          this.errorMessage = 'Book copy not found.';
        } else {
          this.errorMessage = 'Failed to borrow book. Please try again.';
        }
      }
    });
  }

  getAvailableCopies(): CopyDto[] {
    return this.book?.copies.filter(copy => copy.status === 'Available') || [];
  }

  getUnavailableCopies(): CopyDto[] {
    return this.book?.copies.filter(copy => copy.status !== 'Available') || [];
  }

  goBack(): void {
    this.router.navigate(['/books']);
  }
}
