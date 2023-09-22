import { ICheckout } from '../types'
import { ADD_CHECKOUT, RETURN_CHECKOUT, SET_CHECKOUTS } from '../actions/checkoutActions'

// Define the initial state
const initialState: ICheckout[] = []

// Checkout reducer
const checkoutReducer = (state = initialState, action: any): ICheckout[] => {
  switch (action.type) {
    case ADD_CHECKOUT:
      return [...state, action.payload]
    case RETURN_CHECKOUT:
      return state.map((checkout) =>
        checkout._id === action.payload
          ? { ...checkout, returned: true, return_date: new Date() }
          : checkout
      )
    case SET_CHECKOUTS:
      return action.payload
    default:
      return state
  }
}

export default checkoutReducer
