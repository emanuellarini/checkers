import React from 'react'
import PropTypes from 'prop-types'
import StyledDisc from './styled'
import KingIcon from '@material-ui/icons/StarOutlined'

class Disc extends React.Component {
  render() {
    const {player, king, dragKeyName} = this.props
    return (
      <StyledDisc player={player} data-testid={dragKeyName}>
        {king && (
          <KingIcon color="inherit" data-testid={`king-${dragKeyName}`} />
        )}
      </StyledDisc>
    )
  }
}

Disc.defaultProps = {
  king: false,
}

Disc.propTypes = {
  /**
   * Determine which Player owns the Disc
   * 0 = no player
   */
  player: PropTypes.oneOf([0, 1, 2]).isRequired,

  /**
   * Determine if the Disc is a King Disc
   */
  king: PropTypes.bool.isRequired,

  /**
   * The unique key name of Draggable Player Disc in Board
   */
  dragKeyName: PropTypes.string.isRequired,
}

export default Disc
