import type { IBook } from "../types/book";

export const getAuthorsFromBooks = (books: IBook[]) => {
  if (books) {
    const temp = [...books.filter((book) => book?.author)];
    return [...new Set(temp.map((book) => book.author))];
  }
  return [];
};
