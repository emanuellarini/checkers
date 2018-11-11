import styled from 'styled-components'
import withTheme from '@material-ui/core/styles/withTheme'

export default withTheme()(styled.div`
  && {
    color: white;
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
    animation: ${props =>
        props.currentPlayer === 1 ? 'slide-right' : 'slide-left'}
      350ms both;
  }

  @keyframes slide-right {
    from {
      transform: translateX(400%);
      animation-timing-function: ease-in;
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
      animation-timing-function: ease-out;
    }
  }

  @keyframes slide-left {
    from {
      transform: translateX(-400%);
      animation-timing-function: ease-in;
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
      animation-timing-function: ease-out;
    }
  }
`)
