import styled from 'styled-components'

export default styled('div')`
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: ${({player, currentPlayer}) => {
    if (currentPlayer === 1) {
      return player === currentPlayer ? 'grey' : 'transparent'
    }

    return player === currentPlayer ? 'crimson' : 'transparent'
  }};
  color: ${({player, currentPlayer}) =>
    player === currentPlayer ? 'white' : 'black'};
  font-weight: ${({player, currentPlayer}) =>
    player === currentPlayer ? 'bold' : '300'};
`
