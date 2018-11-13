import {createAction} from 'redux-actions'

const OPEN = 'checkers/notification/OPEN'
export const openNotification = createAction(OPEN)

const HIDE = 'checkers/notification/HIDE'
export const hideNotification = createAction(HIDE)

const initialState = {
  open: false,
  duration: 3500,
  message: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN: {
      return {
        ...state,
        open: true,
        duration: action.payload.duration
          ? action.payload.duration
          : state.duration,
        message: action.payload.message,
      }
    }
    case HIDE: {
      return {
        ...state,
        open: false,
      }
    }
    default:
      return state
  }
}

export const notify = message => dispatch => {
  dispatch(openNotification({message}))
}

export const closeNotification = () => dispatch => {
  dispatch(hideNotification())
}
