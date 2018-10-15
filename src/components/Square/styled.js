import styled from 'styled-components'

export default styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: 0 !important;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background: ${props => (props.variant === 'dark' ? 'black' : 'white')};
  animation: ${props => {
      if (props.isDropping) {
        return 'opacity .6s infinite'
      }
    }}
    @keyframes opacity {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`
