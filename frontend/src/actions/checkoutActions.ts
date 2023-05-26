import { ICheckout } from '../types'

// Action Types
export const ADD_CHECKOUT = 'ADD_CHECKOUT'
export const RETURN_CHECKOUT = 'RETURN_CHECKOUT'
export const SET_CHECKOUTS = 'SET_CHECKOUTS'

// Action Creators
export const addCheckout = (checkout: ICheckout) => ({
  type: ADD_CHECKOUT,
  payload: checkout
})

export const returnCheckout = (checkoutId: string) => ({
  type: RETURN_CHECKOUT,
  payload: checkoutId
})

export const setCheckouts = (checkouts: ICheckout[]) => ({
  type: SET_CHECKOUTS,
  payload: checkouts
})
