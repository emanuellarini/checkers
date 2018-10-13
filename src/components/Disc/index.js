import React from 'react'
import PropTypes from 'prop-types'
import Disc from './Disc'
import {Draggable} from 'react-beautiful-dnd'

class ConnectedDisc extends React.Component {
  render() {
    const {player, king, playerDiscKey} = this.props
    const dragKeyName = `disc-player-${player}-${playerDiscKey}`

    const index = player * 100 + Number(playerDiscKey.replace(/^\D+/g, ''))

    return (
      <Draggable draggableId={dragKeyName} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Disc player={player} dragKeyName={dragKeyName} king={king} />
          </div>
        )}
      </Draggable>
    )
  }
}

ConnectedDisc.propTypes = {
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

export default ConnectedDisc
