import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Square from './styled'
import {Droppable} from 'react-beautiful-dnd'
import {determineDisabledStatus} from 'selectors/movement'
import {
  compose,
  pure,
  withProps,
  setPropTypes,
  branch,
  renderComponent,
  shouldUpdate,
} from 'recompose'
import {getSquareVariant} from 'rules/square/variant'

function LightSquare({coords}) {
  return (
    <Square variant="light" key={`light-square-${coords[0]}-${coords[1]}`} />
  )
}

function ConnectedDarkSquare({coords, children, isDropDisabled, dropKeyName}) {
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
      ignoreContainerClipping
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

const composedSquare = compose(
  withProps(({coords}) => ({
    dropKeyName: `board-square-${coords[0]}-${coords[1]}`,
  })),
  pure,
  setPropTypes(propTypes),
)

const composedLightSquare = compose(
  setPropTypes({coords: propTypes.coords}),
  shouldUpdate(false),
  renderComponent(LightSquare),
)

const enhance = compose(
  connect(mapStateToProps),
  branch(
    ({coords}) => getSquareVariant(coords[0], coords[1]) === 'light',
    composedLightSquare,
    composedSquare,
  ),
)

export default enhance(ConnectedDarkSquare)
