export interface BookDto {
  id: string;
  isbn: string;
  title: string;
  author: string;
}

export interface BookDetailsDto {
  id: string;
  isbn: string;
  title: string;
  author: string;
  copies: CopyDto[];
}

export interface CopyDto {
  id: string;
  status: string;
}
