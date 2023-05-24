import { IBook } from '../types';

// Action Types
export const ADD_BOOK = 'ADD_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const SET_BOOKS = 'SET_BOOKS';

// Action Creators
export const addBook = (book: IBook) => ({
  type: ADD_BOOK,
  payload: book,
});

export const removeBook = (bookId: string) => ({
  type: REMOVE_BOOK,
  payload: bookId,
});

export const updateBook = (book: IBook) => ({
  type: UPDATE_BOOK,
  payload: book,
});

export const setBooks = (books: IBook[]) => ({
  type: SET_BOOKS,
  payload: books,
});
