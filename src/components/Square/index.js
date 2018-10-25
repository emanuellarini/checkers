import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Square from './styled'
import {Droppable} from 'react-beautiful-dnd'
import {determineDisabledStatus} from 'selectors/movement'

class ConnectedSquare extends React.Component {
  constructor(props) {
    super(props)
    this.renderSquare = this.renderSquare.bind(this)
  }

  getKey() {
    const {coords} = this.props
    return `board-square-${coords[0]}-${coords[1]}`
  }

  renderSquare(provided, snapshot) {
    const {children, isDropDisabled} = this.props
    const key = this.getKey()
    console.log(snapshot, !isDropDisabled, snapshot.isDraggingOver)
    return (
      <Square
        key={'droppable-' + key}
        data-testid={key}
        variant={'dark'}
        isDraggingOver={!isDropDisabled && snapshot.isDraggingOver}
      >
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </div>
      </Square>
    )
  }

  render() {
    const {isDropDisabled} = this.props
    const key = this.getKey()

    return (
      <Droppable
        droppableId={'droppable-' + key}
        isDropDisabled={isDropDisabled}
      >
        {this.renderSquare}
      </Droppable>
    )
  }
}

ConnectedSquare.propTypes = {
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
}

function mapStateToProps(state, ownProps) {
  return {
    isDropDisabled: determineDisabledStatus(state, ownProps),
  }
}

export default connect(mapStateToProps)(ConnectedSquare)
