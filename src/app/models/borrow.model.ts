export interface BorrowRequest {
  copyId: string;
}

export interface LoanDto {
  id: string;
  copyId: string;
  customerId: string;
  borrowDate: string;
  dueDate: string;
}
