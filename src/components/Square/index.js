import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Square from './styled'
import {Droppable} from 'react-beautiful-dnd'
import {determineDisabledStatus} from 'selectors/movement'
import {compose, pure, withHandlers, withProps, setPropTypes} from 'recompose'

function connectedSquare({
  renderDroppableSquare,
  children,
  isDropDisabled,
  dropKeyName,
}) {
  return (
    <Droppable
      droppableId={'droppable-' + dropKeyName}
      isDropDisabled={isDropDisabled}
    >
      {renderDroppableSquare}
    </Droppable>
  )
}

const propTypes = {
  /**
   * The function who renders the Disc
   */
  children: PropTypes.node.isRequired,

  /**
   * The coordinates represented by X and Y coordinates in Board
   */
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,

  /**
   * Determine if drop is disable
   */
  isDropDisabled: PropTypes.bool.isRequired,

  /**
   * Callback to render a Droppable Square
   */
  renderDroppableSquare: PropTypes.func.isRequired,

  /**
   * A unique key name based on coords
   */
  dropKeyName: PropTypes.string.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    isDropDisabled: determineDisabledStatus(state, ownProps),
  }
}

export default compose(
  connect(mapStateToProps),
  withProps(({coords}) => ({
    dropKeyName: `board-square-${coords[0]}-${coords[1]}`,
  })),
  withHandlers({
    renderDroppableSquare: ({children, isDropDisabled, dropKeyName}) => (
      provided,
      snapshot,
    ) => (
      <Square
        key={'droppable-' + dropKeyName}
        data-testid={dropKeyName}
        variant={'dark'}
        isDraggingOver={!isDropDisabled && snapshot.isDraggingOver}
      >
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </div>
      </Square>
    ),
  }),
  pure,
  setPropTypes(propTypes),
)(connectedSquare)
