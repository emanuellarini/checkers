import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Square from './styled'
import {Droppable} from 'react-beautiful-dnd'
import {determineDisabledStatus} from 'selectors/movement'
import {compose, pure, withProps, setPropTypes} from 'recompose'

function ConnectedSquare({children, isDropDisabled, dropKeyName}) {
  function renderDroppableSquare(provided, snapshot) {
    // did this to disable a warning :(
    const placeholder =
      provided.placeholder &&
      React.cloneElement(provided.placeholder, {
        placeholder: {
          ...provided.placeholder.props.placeholder,
          display: 'none',
        },
      })

    return (
      <Square
        key={'droppable-' + dropKeyName}
        data-testid={dropKeyName}
        variant={'dark'}
        isDraggingOver={!isDropDisabled && snapshot.isDraggingOver}
      >
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {placeholder}
        </div>
      </Square>
    )
  }

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
   * A unique key name based on coords
   */
  dropKeyName: PropTypes.string.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    isDropDisabled: determineDisabledStatus(state, ownProps),
  }
}

const enhance = compose(
  connect(mapStateToProps),
  withProps(({coords}) => ({
    dropKeyName: `board-square-${coords[0]}-${coords[1]}`,
  })),
  pure,
  setPropTypes(propTypes),
)

export default enhance(ConnectedSquare)
