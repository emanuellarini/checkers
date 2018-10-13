import React from 'react'
import PropTypes from 'prop-types'
import StyledDisc from './styled'
import KingIcon from '@material-ui/icons/StarOutlined'
import {Draggable} from 'react-beautiful-dnd'

class Disc extends React.Component {
  render() {
    const {player, king, playerDiscKey} = this.props
    const index = player * 100 + Number(playerDiscKey.replace(/^\D+/g, ''))

    const dragKeyName = `disc-player-${player}-${playerDiscKey}`

    return (
      <Draggable draggableId={dragKeyName} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <StyledDisc player={player} data-testid={dragKeyName}>
              {king && (
                <KingIcon color="inherit" data-testid={`king-${dragKeyName}`} />
              )}
            </StyledDisc>
          </div>
        )}
      </Draggable>
    )
  }
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
  king: PropTypes.bool,

  /**
   * The key name of Player Disc in Board
   */
  playerDiscKey: PropTypes.string,
}

export default Disc
