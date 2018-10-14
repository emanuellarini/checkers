import React from 'react'
import Board from 'components/Board'
import {calculateMovableSquares} from './helpers'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player1: {
        g1: [5, 0],
        g2: [5, 2],
        g3: [5, 4],
        g4: [5, 6],
        g5: [6, 1],
        g6: [6, 3],
        g7: [6, 5],
        g8: [6, 7],
        g9: [7, 0],
        g10: [7, 2],
        g11: [7, 4],
        g12: [7, 6],
      },
      player2: {
        r1: [0, 1],
        r2: [0, 3],
        r3: [0, 5],
        r4: [0, 7],
        r5: [1, 0],
        r6: [1, 2],
        r7: [1, 4],
        r8: [1, 6],
        r9: [2, 1],
        r10: [2, 3],
        r11: [2, 5],
        r12: [2, 7],
      },
      player1Kings: [],
      player2Kings: [],
      movableSquares: [],
    }

    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
  }

  handleDragStart({source, draggableId}) {
    const [player, disckKey, king] = draggableId
      .replace('disc-player-', '')
      .split('-')
    const discs = [this.state.player1, this.state.player2]

    const movableSquares = calculateMovableSquares(
      Number(player),
      disckKey,
      discs,
      king,
    )

    return this.setState({
      movableSquares,
    })
  }

  handleDragEnd({destination, draggableId}) {
    if (!destination || !draggableId) return false

    const [player, disckKey, king] = draggableId
      .replace('disc-player-', '')
      .split('-')
    const [x, y] = destination.droppableId
      .replace(/droppable-board-square-*/, '')
      .split('-')

    this.setState(state => ({
      [`player${player}`]: {
        ...state[`player${player}`],
        [disckKey]: [Number(x), Number(y)],
      },
    }))
  }

  render() {
    const {
      player1,
      player2,
      player1Kings,
      player2Kings,
      movableSquares,
    } = this.state

    return (
      <Board
        playerOne={{
          discs: player1,
          kings: player1Kings,
        }}
        playerTwo={{
          discs: player2,
          kings: player2Kings,
        }}
        movableSquares={movableSquares}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
      />
    )
  }
}

export default Game
