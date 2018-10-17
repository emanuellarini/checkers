import React from 'react'
import PropTypes from 'prop-types'
import Disc from './Disc'
import {Draggable} from 'react-beautiful-dnd'

class ConnectedDisc extends React.PureComponent {
  constructor(props) {
    super(props)

    this.renderDraggableDisc = this.renderDraggableDisc.bind(this)
    this.getDragKeyName = this.getDragKeyName.bind(this)
  }

  getDragKeyName() {
    const {player, king, playerDiscKey} = this.props

    return `disc-player-${player}-${playerDiscKey}${king ? '-king' : ''}`
  }

  renderDraggableDisc(provided) {
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Disc dragKeyName={this.getDragKeyName()} {...this.props} />
      </div>
    )
  }

  render() {
    const {player, playerDiscKey, disableDrag} = this.props
    const dragKeyName = this.getDragKeyName()
    const index = player * 100 + Number(playerDiscKey.replace(/^\D+/g, ''))

    return (
      <Draggable
        draggableId={dragKeyName}
        index={index}
        isDragDisabled={disableDrag}
      >
        {this.renderDraggableDisc}
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

  /**
   * Enable or disable dragging the Disc
   */
  disableDrag: PropTypes.bool.isRequired,
}

export default ConnectedDisc
