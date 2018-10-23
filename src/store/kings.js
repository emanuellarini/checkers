import {createAction} from 'redux-actions'

const CREATE = 'checkers/kings/CREATE'
export const createKing = createAction(CREATE)

const initialState = {
  player1: [],
  player2: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE: {
      const {disc, player} = action.payload

      return {
        ...state,
        [`player${player}`]: [...state[`player${player}`], disc],
      }
    }
    default:
      return state
  }
}
