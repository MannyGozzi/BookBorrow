
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import bookReducer from './bookReducer';
import checkoutReducer from './checkoutReducer';

const rootReducer = combineReducers({
  user: userReducer,
  books: bookReducer,
  checkout: checkoutReducer
});

export default rootReducer;