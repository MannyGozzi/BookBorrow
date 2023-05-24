import { IReview } from '../types';
import { ADD_REVIEW, SET_REVIEWS } from '../actions/reviewActions';

// Define the initial state
const initialState: IReview[] = [];

// Review reducer
const reviewReducer = (state = initialState, action: any): IReview[] => {
  switch (action.type) {
    case ADD_REVIEW:
      return [...state, action.payload];
    case SET_REVIEWS:
      return action.payload;
    default:
      return state;
  }
};

export default reviewReducer;
