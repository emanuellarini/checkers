import React from 'react'
import PropTypes from 'prop-types'
import StyledBoard from './styled'
import ConnectedSquare from 'components/Square'
import Square from 'components/Square/Square'
import ConnectedDisc from 'components/Disc'
import Empty from 'components/Disc/styled'
import _range from 'lodash/range'
import _findKey from 'lodash/findKey'
import {getSquareVariant} from 'rules/square/variant'

/**
 * Visual Representation of the Board
 * Has width * height squares
 */
class Board extends React.PureComponent {
  constructor(props) {
    super(props)
    this.renderDisc = this.renderDisc.bind(this)
  }

  renderDisc(coords) {
    const {playerOne, playerTwo, currentPlayer} = this.props
    const stringCoords = coords.toString()
    const playerOneDisc = _findKey(
      playerOne.discs,
      item => item.toString() === stringCoords,
    )

    if (playerOneDisc) {
      return (
        <ConnectedDisc
          key={'disc-key-' + playerOneDisc}
          player={1}
          disableDrag={currentPlayer !== 1}
          playerDiscKey={playerOneDisc}
          king={playerOne.kings.includes(playerOneDisc)}
          currentPlayer={currentPlayer}
        />
      )
    }

    const playerTwoDisc = _findKey(
      playerTwo.discs,
      item => item.toString() === stringCoords,
    )

    if (playerTwoDisc) {
      return (
        <ConnectedDisc
          player={2}
          disableDrag={currentPlayer !== 2}
          key={'disc-key-' + playerTwoDisc}
          king={playerTwo.kings.includes(playerTwoDisc)}
          playerDiscKey={playerTwoDisc}
          currentPlayer={currentPlayer}
        />
      )
    }

    return <Empty key={'no-payer-' + stringCoords} />
  }

  renderSquares() {
    const {width, height, squareSize, movableSquares} = this.props

    return _range(0, width).map(x =>
      _range(0, height).map(y => {
        if (getSquareVariant(x, y) === 'light') {
          return <Square variant="light" key={`board-square-${x}-${y}`} />
        }

        return (
          <ConnectedSquare
            key={`board-square-${x}-${y}`}
            size={squareSize}
            coords={[x, y]}
            movableSquares={movableSquares}
            renderDisc={this.renderDisc}
          />
        )
      }),
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
  movableSquares: [],
  currentPlayer: 1,
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

  /**
   * The movable squares
   */
  movableSquares: PropTypes.array,

  /**
   * The user who is playing the turn
   */
  currentPlayer: PropTypes.oneOf([1, 2]).isRequired,
}

export default Board
