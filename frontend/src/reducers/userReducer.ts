import { IUser } from '../types';
import { SET_CURRENT_USER } from '../actions/userActions';

// Define the initial state
const initialState: IUser | null = null;

// User reducer
const userReducer = (state = initialState, action: any): IUser | null => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
