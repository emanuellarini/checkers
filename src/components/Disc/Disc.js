import React from 'react'
import PropTypes from 'prop-types'
import StyledDisc from './styled'
import KingIcon from '@material-ui/icons/StarOutlined'
import {compose, pure, setPropTypes, defaultProps} from 'recompose'

function Disc({player, isKing, dragKeyName}) {
  return (
    <StyledDisc player={player} data-testid={dragKeyName}>
      {isKing && (
        <KingIcon color="inherit" data-testid={`king-${dragKeyName}`} />
      )}
    </StyledDisc>
  )
}

const defaults = {
  isKing: false,
}

const propTypes = {
  /**
   * Determine which Player owns the Disc
   * 0 = no player
   */
  player: PropTypes.oneOf([0, 1, 2]).isRequired,

  /**
   * Determine if the Disc is a King Disc
   */
  isKing: PropTypes.bool.isRequired,

  /**
   * The unique key name of Draggable Player Disc in Board
   */
  dragKeyName: PropTypes.string.isRequired,
}

const enhance = compose(
  defaultProps(defaults),
  setPropTypes(propTypes),
  pure,
)

export default enhance(Disc)
