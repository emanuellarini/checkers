import React from 'react'
import PropTypes from 'prop-types'
import Square from './Square'
import {Droppable} from 'react-beautiful-dnd'

/**
 * Visual representation of Board Squares
 * Dark and Light square variants are represented by coordinates x,y
 */
class ConnectedSquare extends React.PureComponent {
  constructor(props) {
    super(props)

    this.getKey = this.getKey.bind(this)
  }

  getKey() {
    const {coords} = this.props
    return `board-square-${coords[0]}-${coords[1]}`
  }

  render() {
    const {coords, renderDisc, movableSquares} = this.props

    const disabled = !movableSquares.some(
      item => item.toString() === coords.toString(),
    )

    return (
      <Droppable
        droppableId={'droppable-' + this.getKey()}
        isDropDisabled={disabled}
      >
        {(provided, snapshot) => (
          <Square
            key={this.getKey()}
            {...this.props}
            isDropping={snapshot.isDraggingOver && !disabled}
          >
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {renderDisc(coords)}
              {provided.placeholder}
            </div>
          </Square>
        )}
      </Droppable>
    )
  }
}

ConnectedSquare.propTypes = {
  /**
   * The function who renders the Disc
   */
  renderDisc: PropTypes.func.isRequired,

  /**
   * The coordinates represented by X and Y coordinates in Board
   */
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default ConnectedSquare
