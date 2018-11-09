import styled from 'styled-components'
import withTheme from '@material-ui/core/styles/withTheme'

export default withTheme()(styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  position: relative;
  box-sizing: border-box;
  background: ${({variant, theme}) => theme.palette.square[variant]};
  ${({theme, variant}) =>
    variant === 'dark' &&
    `
    outline: solid 1px ${theme.palette.square.border};
    outline-offset: -1px;
  `} ${props =>
    props.isDraggingOver &&
    `
    opacity: .8;
    
    &::before,
    &::after {
      content: '';
      position: absolute;
      box-sizing: border-box;
      border: 1px solid transparent;
      width: 0;
      height: 0;
      animation-timing-function: linear;
    }
    
    &::before {
      top: 0;
      left: 0;
      animation: border-before 1.5s infinite;
    }
    
    &::after {
      bottom: 0;
      right: 0;
      animation: border-after 1.5s infinite;
    }
  `} @keyframes border-before {
    0% {
      width: 0;
      height: 0;
      border-top-color: rgba(255, 255, 255, 0.72);
      border-right-color: transparent;
    }
    24.99% {
      border-right-color: transparent;
    }
    25% {
      height: 0;
      width: 100%;
      border-top-color: rgba(255, 255, 255, 0.72);
      border-right-color: rgba(255, 255, 255, 0.72);
    }
    50%,
    100% {
      width: 100%;
      height: 100%;
      border-top-color: rgba(255, 255, 255, 0.72);
      border-right-color: rgba(255, 255, 255, 0.72);
    }
  }

  @keyframes border-after {
    0%,
    49.99% {
      width: 0;
      height: 0;
      border-left-color: transparent;
      border-bottom-color: transparent;
    }
    50% {
      width: 0;
      height: 0;
      border-left-color: transparent;
      border-bottom-color: rgba(255, 255, 255, 0.72);
    }
    74.99% {
      border-left-color: transparent;
      border-bottom-color: rgba(255, 255, 255, 0.72);
    }
    75% {
      height: 0;
      width: 100%;
      border-left-color: rgba(255, 255, 255, 0.72);
      border-bottom-color: rgba(255, 255, 255, 0.72);
    }
    100% {
      width: 100%;
      height: 100%;
      border-left-color: rgba(255, 255, 255, 0.72);
      border-bottom-color: rgba(255, 255, 255, 0.72);
    }
  }
`)
