import React from 'react'
import PropTypes from 'prop-types'
import StyledBoard from './styled'
import Square from 'components/Square'
import _range from 'lodash/range'
import _findKey from 'lodash/findKey'
import Disc from 'components/Disc'
import DiscStyleOnly from 'components/Disc/styled'
import {determineDisableStatus} from 'components/Square/helpers'

/**
 * Visual Representation of the Board
 * Has width * height squares
 */
class Board extends React.Component {
  constructor(props) {
    super(props)
    this.renderDisc = this.renderDisc.bind(this)
  }

  renderDisc(coords) {
    const {playerOne, playerTwo} = this.props
    const stringCoords = coords.toString()
    const playerOneDisc = _findKey(
      playerOne.discs,
      item => item.toString() === stringCoords,
    )

    if (playerOneDisc) {
      return (
        <Disc
          player={1}
          playerDiscKey={playerOneDisc}
          king={playerOne.kings.includes(playerOneDisc)}
        />
      )
    }

    const playerTwoDisc = _findKey(
      playerTwo.discs,
      item => item.toString() === stringCoords,
    )

    if (playerTwoDisc) {
      return (
        <Disc
          player={2}
          king={playerTwo.kings.includes(playerTwoDisc)}
          playerDiscKey={playerTwoDisc}
        />
      )
    }

    return <DiscStyleOnly />
  }

  renderSquares() {
    const {width, height, squareSize, playerOne, playerTwo} = this.props

    return _range(0, width).map(x =>
      _range(0, height).map(y => (
        <Square
          key={`board-square-${x}-${y}`}
          size={squareSize}
          coords={[x, y]}
          disabledDrop={determineDisableStatus(
            x,
            y,
            playerOne.discs,
            playerTwo.discs,
          )}
          renderDisc={this.renderDisc}
        />
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
  playerOne: {
    discs: {},
    kings: [],
  },
  playerTwo: {
    discs: {},
    kings: [],
  },
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

  /**
   * The Player One Information
   */
  playerOne: PropTypes.shape({
    discs: PropTypes.object.isRequired,
    kings: PropTypes.array,
  }).isRequired,

  /**
   * The Player Two Information
   */
  playerTwo: PropTypes.shape({
    discs: PropTypes.object.isRequired,
    kings: PropTypes.array,
  }).isRequired,
}

export default Board
