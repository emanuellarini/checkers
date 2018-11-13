import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import withTheme from '@material-ui/core/styles/withTheme'
import {lighten} from '@material-ui/core/styles/colorManipulator'

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

export default withTheme()(styled(({isKing, isDragging, ...otherProps}) => (
  <Paper {...otherProps} elevation={isDragging ? 12 : 4} component="div" />
))`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-sizing: border-box;
    width: 70%;
    position: relative;
    margin: 15%;
    padding-bottom: 70%;
    background: ${({player, theme}) => {
      if (player === 1) return theme.palette.primary.main
      if (player === 2) return theme.palette.secondary.main
      return 'transparent'
    }};
  }

  &::after {
    content: '';
    border-radius: 50%;
    width: 70%;
    height: 70%;
    margin: 15%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px inset
      ${({player, theme}) =>
        player === 1
          ? lighten(theme.palette.primary.main, 0.1)
          : lighten(theme.palette.secondary.main, 0.1)};
  }

  &::before {
    content: ${props => (!props.children ? '""' : undefined)};
    border-radius: 50%;
    width: 30%;
    height: 30%;
    margin: 35%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px groove
      ${({player, theme}) =>
        player === 1
          ? lighten(theme.palette.primary.main, 0.1)
          : lighten(theme.palette.secondary.main, 0.1)};
  }

  .KingDisc {
    width: 40%;
    height: auto;
    position: absolute;
    top: 29%;
    left: 29%;
  }
`)
