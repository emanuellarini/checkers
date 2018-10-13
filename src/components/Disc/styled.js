import styled from 'styled-components'

export default styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: #efefef;
  background: ${({player}) => {
    if (player === 1) return 'grey'
    if (player === 2) return 'red'
    return 'transparent'
  }};
`
