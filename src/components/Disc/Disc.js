import React from 'react'
import PropTypes from 'prop-types'
import StyledDisc from './styled'
import KingDiscIcon from 'assets/icons/king-disc'
import {compose, pure, setPropTypes, defaultProps} from 'recompose'
import withStyles from '@material-ui/core/styles/withStyles'

function Disc({theme, player, isKing, dragKeyName, isDragging}) {
  return (
    <StyledDisc
      theme={theme}
      player={player}
      data-testid={dragKeyName}
      isDragging={isDragging}
    >
      {isKing && <KingDiscIcon />}
    </StyledDisc>
  )
}

const defaults = {
  isKing: false,
}

const propTypes = {
  /**
   * Material UI Theme variables
   */
  theme: PropTypes.object.isRequired,

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
  withStyles(null, {withTheme: true}),
  setPropTypes(propTypes),
  pure,
)

export default enhance(Disc)
