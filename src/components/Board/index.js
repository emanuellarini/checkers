import React from 'react'
import PropTypes from 'prop-types'
import StyledBoard from './styled'
import Square from 'components/Square'
import _range from 'lodash/range'

/**
 * Visual Representation of the Board
 * Has width * height squares
 */
class Board extends React.Component {
  renderSquares() {
    const {width, height, squareSize} = this.props
    return _range(0, width).map(x =>
      _range(0, height).map(y => (
        <Square key={`board-square-${x}-${y}`} size={squareSize} x={x} y={y} />
      )),
    )
  }

  render() {
    const {width, squareSize} = this.props

    const renderedSquares = this.renderSquares()

    return (
      <StyledBoard maxWidth={width * squareSize} data-testid="board">
        {renderedSquares}
      </StyledBoard>
    )
  }
}

Board.defaultProps = {
  width: 8,
  height: 8,
  squareSize: 80,
}

Board.propTypes = {
  /**
   * Represets the quantity of squares the Board has in width
   */
  width: PropTypes.number.isRequired,

  /**
   * Represets the quantity of squares the Board has in height
   */
  height: PropTypes.number.isRequired,

  /**
   * Represets the size of Squares
   */
  squareSize: PropTypes.number.isRequired,
}

export default Board
