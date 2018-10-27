import styled from 'styled-components'

export default styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80psx;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  margin: 0 !important;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background: ${props => (props.variant === 'dark' ? 'black' : 'white')};
  ${props => props.isDraggingOver && 'opacity: .62;'};
`
