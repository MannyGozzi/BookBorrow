import { IBook } from '../types';
import {
  ADD_BOOK,
  REMOVE_BOOK,
  UPDATE_BOOK,
  SET_BOOKS,
} from '../actions/bookActions';

// Define the initial state
const initialState: IBook[] = [];

// Book reducer
const bookReducer = (state = initialState, action: any): IBook[] => {
  switch (action.type) {
    case ADD_BOOK:
      return [...state, action.payload];
    case REMOVE_BOOK:
      return state.filter((book) => book._id !== action.payload);
    case UPDATE_BOOK:
      return state.map((book) =>
        book._id === action.payload._id ? action.payload : book
      );
    case SET_BOOKS:
      return action.payload;
    default:
      return state;
  }
};

export default bookReducer;
