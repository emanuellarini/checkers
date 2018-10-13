import React from 'react'
import Board from 'components/Board'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerOneDiscs: {
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
      playerTwoDiscs: {
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
      playerOneKings: [],
      playerTwoKings: [],
    }
  }

  render() {
    const {
      playerOneDiscs,
      playerTwoDiscs,
      playerOneKings,
      playerTwoKings,
    } = this.state

    return (
      <Board
        playerOne={{
          discs: playerOneDiscs,
          kings: playerOneKings,
        }}
        playerTwo={{
          discs: playerTwoDiscs,
          kings: playerTwoKings,
        }}
      />
    )
  }
}

export default Game
