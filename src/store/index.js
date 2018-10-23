import {combineReducers} from 'redux'
import turns from './turns'
import discs from './discs'
import kings from './kings'
import movement from './movement'

export default combineReducers({
  turns,
  discs,
  kings,
  movement,
})
