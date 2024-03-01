// export const actionType = {
//   DECREMENT: 'DECREMENT',
// }

// export const decrement = (payload) => ({
//   type: actionType.DECREMENT,
//   payload,
// })

const DECREMENT = 'counter/decrement'

export function decrement(amount: number) {
  return {
    type: DECREMENT,
    payload: amount
  }
}
