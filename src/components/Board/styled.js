import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import withTheme from '@material-ui/core/styles/withTheme'

export default withTheme()(styled(props => <Paper {...props} elevation={2} />)`
  && {
    display: flex;
    flex-wrap: wrap;
    min-width: 400px;
    width: 400px;
    height: 400px;
    min-height: 400px;
    border: solid 10px ${({theme}) => theme.palette.board.border};
  }
`)
