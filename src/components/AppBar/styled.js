import styled from 'styled-components'
import withTheme from '@material-ui/core/styles/withTheme'

export default withTheme()(styled.div`
  && {
    color: white;
  }

  .Title {
    flex-grow: 1;
  }

  .Turns > div {
    margin: 0 auto;
  }

  .Divider {
    margin: 0 auto 4px auto;
    background-color: ${({theme, currentPlayer}) =>
      currentPlayer === 1
        ? theme.palette.primary.light
        : theme.palette.secondary.main};
    border-radius: 8px;
    height: 3px;
    width: 30%;
  }
`)
