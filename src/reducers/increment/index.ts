// import rootAction from '@src/actions'

// const initialState = {
//   inNumber: 0,
// }

// const inReducer = (state = initialState, { type, payload } = {}) => {
//   switch (type) {
//     case rootAction.inAction.actionType.INCREMENT:
//       return { ...state, inNumber: state.inNumber + payload }
//     case rootAction.deAction.actionType.DECREMENT:
//       return { ...state, inNumber: state.inNumber - payload }
//     default:
//       return state
//   }
// }

// export default inReducer

import { createAction, createReducer } from '@reduxjs/toolkit'

const increment = createAction<number>('counter/increment')

const counterReducer = createReducer(0, builder => {
  builder.addCase(increment, (state, action) => state + action.payload)
})

export default counterReducer
