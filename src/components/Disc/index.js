import React from 'react'
import PropTypes from 'prop-types'
import StyledDisc from './styled'
import KingIcon from '@material-ui/icons/StarOutlined'

class Disc extends React.Component {
  render() {
    const {player, king} = this.props

    return (
      player && (
        <StyledDisc player={player} data-testid={'disc-player-' + player}>
          {king && (
            <KingIcon
              color="inherit"
              data-testid={'king-disc-player-' + player}
            />
          )}
        </StyledDisc>
      )
    )
  }
}

Disc.propTypes = {
  player: PropTypes.oneOf([1, 2]),
  king: PropTypes.bool,
}

export default Disc
