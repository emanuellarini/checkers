import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

export default styled(({maxWidth, ...other}) => (
  <Paper elevation={0} {...other} />
))`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: ${props => props.maxWidth || 640}px;
  border: 1px solid #ccc;
`
