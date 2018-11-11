import React from 'react'
import PropTypes from 'prop-types'
import StyledDisc from './styled'
import KingDiscIcon from 'assets/icons/king-disc'
import {compose, pure, setPropTypes, defaultProps} from 'recompose'

function Disc({player, isKing, dragKeyName, isDragging}) {
  return (
    <StyledDisc
      player={player}
      data-testid={dragKeyName}
      isDragging={isDragging}
    >
      {isKing && <KingDiscIcon className="KingDisc" />}
    </StyledDisc>
  )
}

const defaults = {
  isKing: false,
  isDragging: false,
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

  /**
   * Determine if the Disc is being dragged
   */
  isDragging: PropTypes.bool.isRequired,
}

const enhance = compose(
  defaultProps(defaults),
  setPropTypes(propTypes),
  pure,
)

export default enhance(Disc)
