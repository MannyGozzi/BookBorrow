
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import bookReducer from './bookReducer';
import checkoutReducer from './checkoutReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
  user: userReducer,
  books: bookReducer,
  checkouts: checkoutReducer,
  reviews: reviewReducer,
});

export default rootReducer;