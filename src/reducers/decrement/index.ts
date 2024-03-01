// import rootAction from '@src/actions'

// interface InitialState {
//   deNumber: number
// }

// const initialState:InitialState = {
//   deNumber: 0
// }

// const deReducer = (state = initialState, { type, payload } = {}) => {
//   switch (type) {
//     case rootAction.inAction.actionType.INCREMENT:
//       return { ...state, deNumber: state.deNumber + payload }
//     case rootAction.deAction.actionType.DECREMENT:
//       return { ...state, deNumber: state.deNumber - payload }
//     default:
//       return state
//   }
// }

// export default deReducer
import { createAction, createReducer } from '@reduxjs/toolkit'

const decrement = createAction<number>('counter/decrement')

const counterReducer = createReducer(0, builder => {
  builder.addCase(decrement, (state, action) => state - action.payload)
})

export default counterReducer
