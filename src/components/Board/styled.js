import styled from 'styled-components'

export default styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  min-width: ${props => props.maxWidth || 640}px;
  width: ${props => props.maxWidth || 640}px;
  border: 1px solid #ccc;
`
