import styled from 'styled-components'

export default styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  margin: 0 !important;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background: ${props => (props.variant === 'dark' ? 'black' : 'white')};
  ${props => props.isDraggingOver && 'opacity: .62;'};
`
