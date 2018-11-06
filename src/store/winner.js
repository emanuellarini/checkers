import {createAction} from 'redux-actions'

const SET_PLAYER = 'checkers/winner/SET_PLAYER'
export const setWinnerPlayer = createAction(SET_PLAYER)

const initialState = {
  player: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER: {
      return {
        ...state,
        player: action.payload.player,
      }
    }
    default:
      return state
  }
}
