import styled from 'styled-components'

export default styled('div')`
  display: flex !important;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  color: #efefef;
  background: ${({player}) => {
    if (player === 1) return 'grey'
    if (player === 2) return 'red'
    return 'transparent'
  }};
  border: 1px dashed ${({player}) => (player ? '#ccc' : 'transparent')};
  box-sizing: border-box;
`
