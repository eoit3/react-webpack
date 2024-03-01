// export const actionType = {
//   INCREMENT: 'INCREMENT',
// }

// export const increment = (payload) => ({
//   type: actionType.INCREMENT,
//   payload,
// })

const INCREMENT = 'counter/increment'

export function increment(amount: number) {
  return {
    type: INCREMENT,
    payload: amount
  }
}
