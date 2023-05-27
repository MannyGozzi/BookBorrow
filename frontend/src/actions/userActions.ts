import { IUser } from '../types'

// Action Types
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

// Action Creators
export const setCurrentUser = (user: IUser) => ({
  type: SET_CURRENT_USER,
  payload: user
})

export const resetCurrentUser = () => ({
  type: SET_CURRENT_USER,
  payload: null
})
