import styled from 'styled-components'
import withTheme from '@material-ui/core/styles/withTheme'

export default withTheme()(styled.div`
  && {
    color: white;
  }

  .Title {
    flex-grow: 1;
  }

  .Turns {
    margin: 0 auto;
    max-width: 560px;
    width: 100%;
  }

  .Divider {
    background-color: ${({theme, currentPlayer}) =>
      currentPlayer === 1
        ? theme.palette.primary.light
        : theme.palette.secondary.main};
    border-radius: 8px;
    height: 3px;
    width: 50%;
    margin-left: 25%;
    margin-bottom: 4px;
  }
`)
