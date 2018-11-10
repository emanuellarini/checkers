import React from 'react'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'
import withTheme from '@material-ui/core/styles/withTheme'
import green from '@material-ui/core/colors/green'

export default withTheme()(styled(props => <Paper {...props} elevation={2} />)`
  && {
    width: calc(50% - ${props => props.theme.spacing.unit}px);
  }

  .Box {
    padding: ${props => props.theme.spacing.unit * 2}px;
    &.Header {
      display: flex;
      align-items: center;
    }
  }

  .Disc {
    width: 35px;
    height: 35px;
    position: relative;
    border-radius: 50%;
    margin-right: ${props => props.theme.spacing.unit * 2}px;

    &.Player1 {
      background: ${props => props.theme.palette.primary.main};
    }

    &.Player2 {
      background: ${props => props.theme.palette.secondary.main};
    }

    .IsPlaying {
      position: absolute;
      top: -3px;
      left: -3px;
      z-index: 1;
      color: ${green[500]};
    }
  }

  .CapturedDiscs {
    border-left: 2px solid ${props => props.theme.palette.divider};
    padding: ${props => props.theme.spacing.unit}px
      ${props => props.theme.spacing.unit * 2}px;

    .CapturedDisc {
      display: inline-block;
      width: 15px;
      height: 15px;
      margin: ${props => props.theme.spacing.unit / 2}px;
      border-radius: 50%;

      &.Player1 {
        background: ${props => props.theme.palette.primary.main};
      }

      &.Player2 {
        background: ${props => props.theme.palette.secondary.main};
      }
    }
  }
`)
