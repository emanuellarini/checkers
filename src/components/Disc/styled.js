import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import withTheme from '@material-ui/core/styles/withTheme'

export function Empty() {
  return styled('div')`
    && {
      display: block;
      width: 70%;
      padding-bottom: 70%;
      margin: 15%;
    }
  `
}

export default withTheme()(styled(({isDragging, ...otherProps}) => (
  <Paper {...otherProps} elevation={isDragging ? 12 : 4} component="div" />
))`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 70%;
    margin: 15%;
    padding-bottom: 70%;
    background: ${({player, theme}) => {
      if (player === 1) return theme.palette.primary.main
      if (player === 2) return theme.palette.secondary.main
      return 'transparent'
    }};
  }
`)
