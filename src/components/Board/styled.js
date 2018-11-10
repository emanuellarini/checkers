import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import withTheme from '@material-ui/core/styles/withTheme'

export default withTheme()(styled(props => <Paper {...props} elevation={2} />)`
  && {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    margin-bottom: ${props => props.theme.spacing.unit * 2}px;
    margin-top: ${props => props.theme.spacing.unit * 2}px;
    border: ridge 20px ${({theme}) => theme.palette.board.border};
  }

  .FixWidthAndHeight {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    height: 100% !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
`)
