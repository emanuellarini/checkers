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
 * Has 8 * 8 squares
 */
class Board extends React.Component {
  constructor(props) {
    super(props)
    this.renderDisc = this.renderDisc.bind(this)
  }

  renderDisc(coords) {
    const {
      player1Discs,
      player2Discs,
      player1Kings,
      player2Kings,
      currentPlayer,
    } = this.props

    const stringCoords = coords.toString()
    const playerOneDisc = _findKey(
      player1Discs,
      item => item.toString() === stringCoords,
    )

    if (playerOneDisc) {
      return (
        <ConnectedDisc
          key={'disc-key-' + playerOneDisc}
          player={1}
          disableDrag={currentPlayer !== 1}
          playerDiscKey={playerOneDisc}
          king={player1Kings.includes(playerOneDisc)}
          currentPlayer={currentPlayer}
        />
      )
    }

    const playerTwoDisc = _findKey(
      player2Discs,
      item => item.toString() === stringCoords,
    )

    if (playerTwoDisc) {
      return (
        <ConnectedDisc
          player={2}
          disableDrag={currentPlayer !== 2}
          key={'disc-key-' + playerTwoDisc}
          king={player2Kings.includes(playerTwoDisc)}
          playerDiscKey={playerTwoDisc}
          currentPlayer={currentPlayer}
        />
      )
    }

    return <Empty key={'no-payer-' + stringCoords} />
  }

  renderSquares() {
    return _range(0, 8).map(x =>
      _range(0, 8).map(y => {
        if (getSquareVariant(x, y) === 'light') {
          return <Square variant="light" key={`board-square-${x}-${y}`} />
        }

        return (
          <ConnectedSquare
            key={`connected-board-square-${x}-${y}`}
            coords={[x, y]}
          >
            {this.renderDisc([x, y])}
          </ConnectedSquare>
        )
      }),
    )
  }

  render() {
    const renderedSquares = this.renderSquares()

    return <StyledBoard data-testid="board">{renderedSquares}</StyledBoard>
  }
}

Board.defaultProps = {
  movableSquares: [],
  currentPlayer: 1,
  player1Discs: {},
  player2Discs: {},
  player1Kings: [],
  player2Kings: [],
}

Board.propTypes = {
  /**
   * The player One Discs coordinates
   */
  player1Discs: PropTypes.object.isRequired,

  /**
   * The player One King Discs coordinates
   */
  player1Kings: PropTypes.array,

  /**
   * The player One Discs coordinates
   */
  player2Discs: PropTypes.object.isRequired,

  /**
   * The player One King Discs coordinates
   */
  player2Kings: PropTypes.array,

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
