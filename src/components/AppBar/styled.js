import React from 'react'
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

  .Tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .Divider {
    background-color: ${({theme, currentPlayer}) =>
      currentPlayer === 1
        ? theme.palette.primary.main
        : theme.palette.secondary.main};
    height: 5px;
    width: 50%;
    margin-bottom: 4px;
    animation: ${props =>
        props.currentPlayer === 1 ? 'bounce-in-right' : 'bounce-in-left'}
      1s both;
  }

  @keyframes bounce-in-right {
    0% {
      transform: translateX(400%);
      animation-timing-function: ease-in;
      opacity: 0;
    }
    38% {
      transform: translateX(0);
      animation-timing-function: ease-out;
      opacity: 1;
    }
    55% {
      transform: translateX(30%);
      animation-timing-function: ease-in;
    }
    72% {
      transform: translateX(0);
      animation-timing-function: ease-out;
    }
    81% {
      transform: translateX(15%);
      animation-timing-function: ease-in;
    }
    90% {
      transform: translateX(0);
      animation-timing-function: ease-out;
    }
    95% {
      transform: translateX(5%);
      animation-timing-function: ease-in;
    }
    100% {
      transform: translateX(0);
      animation-timing-function: ease-out;
    }
  }
  @keyframes bounce-in-left {
    0% {
      transform: translateX(-400%);
      animation-timing-function: ease-in;
      opacity: 0;
    }
    38% {
      transform: translateX(100%);
      animation-timing-function: ease-out;
      opacity: 1;
    }
    55% {
      transform: translateX(75%);
      animation-timing-function: ease-in;
    }
    72% {
      transform: translateX(100%);
      animation-timing-function: ease-out;
    }
    81% {
      transform: translateX(80%);
      animation-timing-function: ease-in;
    }
    90% {
      transform: translateX(100%);
      animation-timing-function: ease-out;
    }
    95% {
      transform: translateX(95%);
      animation-timing-function: ease-in;
    }
    100% {
      transform: translateX(100%);
      animation-timing-function: ease-out;
    }
  }
`)
