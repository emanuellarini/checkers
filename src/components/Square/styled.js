import styled from 'styled-components'
import withTheme from '@material-ui/core/styles/withTheme'

export default withTheme()(styled.div`
  width: calc(100% / 8);
  min-width: calc(100% / 8);
  padding: 0;
  position: relative;
  box-sizing: border-box;
  background: ${({variant, theme}) => theme.palette.square[variant]};
  ${({theme, variant}) =>
    variant === 'dark' &&
    `
    border: outset 1px ${theme.palette.square.border};
  `} &:nth-child(8n + 1) {
    border-left: outset 1px ${props => props.theme.palette.square.border};
  }

  &:nth-child(8n) {
    border-right: outset 1px ${props => props.theme.palette.square.border};
  }

  &:nth-child(1),
  &:nth-child(3),
  &:nth-child(5),
  &:nth-child(7) {
    border-top: outset 1px ${props => props.theme.palette.square.border};
  }

  &:nth-child(58),
  &:nth-child(60),
  &:nth-child(62),
  &:nth-child(64) {
    border-bottom: outset 1px ${props => props.theme.palette.square.border};
  }

  @keyframes border-before {
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
  ${props =>
    props.isDraggingOver &&
    `
    opacity: .8;
    
    &::before,
    &::after {
      content: '';
      position: absolute;
      box-sizing: border-box;
      border: 1px outset transparent;
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
  `};
`)
