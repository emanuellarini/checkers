import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import withTheme from '@material-ui/core/styles/withTheme'

export function Empty() {
  return styled('div')`
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
  `
}

export default withTheme()(styled(({isDragging, ...otherProps}) => (
  <Paper {...otherProps} elevation={isDragging ? 12 : 4} component="div" />
))`
  && {
    display: flex !important;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background: ${({player, theme}) => {
      if (player === 1) return theme.palette.primary.main
      if (player === 2) return theme.palette.secondary.main
      return 'transparent'
    }};
  }
`)
