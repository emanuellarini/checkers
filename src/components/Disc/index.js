import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Disc from './Disc'
import {Draggable} from 'react-beautiful-dnd'
import {getPlayerDiscInformation} from 'selectors/disc'
import Empty from './styled'

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
    const {player, king} = this.props

    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Disc player={player} dragKeyName={this.getDragKeyName()} king={king} />
      </div>
    )
  }

  render() {
    const {player, playerDiscKey, disableDrag} = this.props

    if (!player) {
      return <Empty />
    }

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
   */
  player: PropTypes.oneOf([0, 1, 2]).isRequired,

  /**
   * The coordinates represented by X and Y coordinates in Board
   */
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,

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

function mapStateToProps(state, ownProps) {
  return getPlayerDiscInformation(state, ownProps)
}

export default connect(mapStateToProps)(ConnectedDisc)
