import styled from 'styled-components'

export default styled('div')`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => (props.variant === 'dark' ? 'black' : 'white')};
`
