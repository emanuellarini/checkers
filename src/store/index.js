import {combineReducers} from 'redux'
import turns from './turns'
import discs from './player-discs'
import kings from './player-kings'
import movement from './movement'

export default combineReducers({
  turns,
  movement,
  player1: combineReducers({
    discs: discs(1),
    kings: kings(1),
  }),
  player2: combineReducers({
    discs: discs(2),
    kings: kings(2),
  }),
})
