import React from 'react'
import {connect} from 'react-redux'
import {
  pure,
  compose,
  withHandlers,
  withProps,
  setPropTypes,
  branch,
  renderComponent,
} from 'recompose'
import PropTypes from 'prop-types'
import Disc from './Disc'
import {Draggable} from 'react-beautiful-dnd'
import Empty from './styled'
import {
  getPlayerFromDiscCoordsSelector,
  getDiscKeyFromPlayerDiscsSelector,
  determineIfIsAKingDiscSelector,
  determineIfDragIsDisabledSelector,
} from 'selectors/disc'

const propTypes = {
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
  isKing: PropTypes.bool,

  /**
   * The key name of Player Disc in Board
   */
  playerDiscKey: PropTypes.string,

  /**
   * Enable or disable dragging the Disc
   */
  isDragDisabled: PropTypes.bool.isRequired,

  /**
   * Renders a Draggable Disc
   */
  renderDraggableDisc: PropTypes.func.isRequired,
}

function connectedDisc({
  renderDraggableDisc,
  dragKeyName,
  player,
  playerDiscKey,
  isKing,
  isDragDisabled,
}) {
  const index = player * 100 + Number(playerDiscKey.replace(/^\D+/g, ''))

  return (
    <Draggable
      draggableId={dragKeyName}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {renderDraggableDisc}
    </Draggable>
  )
}

function mapStateToProps(state, ownProps) {
  const player = getPlayerFromDiscCoordsSelector(state, ownProps)
  const playerDiscKey = getDiscKeyFromPlayerDiscsSelector(state, ownProps)(
    player,
  )
  const isDragDisabled = determineIfDragIsDisabledSelector(state, ownProps)(
    player,
  )
  const isKing = determineIfIsAKingDiscSelector(state, ownProps)(playerDiscKey)

  return {
    player,
    playerDiscKey,
    isDragDisabled,
    isKing,
  }
}

const composedConnectedDisc = compose(
  withProps(({player, playerDiscKey, isKing}) => ({
    dragKeyName: `disc-player-${player}-${playerDiscKey}${
      isKing ? '-king' : ''
    }`,
  })),
  withHandlers({
    renderDraggableDisc: ({player, dragKeyName, isKing}) => provided => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Disc player={player} dragKeyName={dragKeyName} king={isKing} />
      </div>
    ),
  }),
  setPropTypes(propTypes),
)

const enhance = compose(
  connect(mapStateToProps),
  branch(props => !props.player, renderComponent(Empty), composedConnectedDisc),
  pure,
)

export default enhance(connectedDisc)
