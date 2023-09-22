import { IReview } from '../types'

// Action Types
export const ADD_REVIEW = 'ADD_REVIEW'
export const SET_REVIEWS = 'SET_REVIEWS'

// Action Creators
export const addReview = (review: IReview) => ({
  type: ADD_REVIEW,
  payload: review
})

export const setReviews = (reviews: IReview[]) => ({
  type: SET_REVIEWS,
  payload: reviews
})
