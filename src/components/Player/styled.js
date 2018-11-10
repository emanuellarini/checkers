import React from 'react'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'
import withTheme from '@material-ui/core/styles/withTheme'

export default withTheme()(styled(({currentPlayer, player, ...props}) => (
  <Paper {...props} elevation={currentPlayer === player ? 8 : 2} />
))`
  && {
    margin-bottom: ${props => props.theme.spacing.unit * 2}px;
    margin-top: ${props => props.theme.spacing.unit * 2}px;
    width: 100%;
    transition: box-shadow 350ms ease-in-out;
    margin-bottom: 16px;
  }

  hr {
    height: 5px;
  }

  .Box {
    &.Header {
      padding: ${props => props.theme.spacing.unit * 2}px;
      display: flex;
      align-items: center;

      .Disc {
        width: 35px;
        height: 35px;
        position: relative;
        border-radius: 50%;
        margin-right: ${props => props.theme.spacing.unit * 2}px;
        background: ${props =>
          props.player === 1
            ? props.theme.palette.primary.main
            : props.theme.palette.secondary.main};
      }
    }

    &.Body {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;

      .Statistic {
        padding: ${props => props.theme.spacing.unit * 3}px
          ${props => props.theme.spacing.unit}px;
        text-align: center;

        img {
          max-height: 80px;
          max-width: 120px;
        }
      }
    }
  }
`)
