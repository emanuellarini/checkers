import styled from 'styled-components'

export default styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: ${props => props.maxWidth || 640}px;
  border: 1px solid #ccc;
`
