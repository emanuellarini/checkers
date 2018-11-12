import styled from 'styled-components'
import withTheme from '@material-ui/core/styles/withTheme'

export default withTheme()(styled.div`
  && {
    color: white;
    width: 100%;
    padding: 0 0 ${props => props.theme.spacing.unit * 2}px;
  }

  &:first-of-type {
    margin-right: ${props => props.theme.spacing.unit}px;
  }

  .Box {
    &.Header {
      padding: 0 ${props => props.theme.spacing.unit}px
        ${props => props.theme.spacing.unit}px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;

      .Avatar {
        margin-bottom: ${props => props.theme.spacing.unit}px;
        background: ${props =>
          props.player === 1
            ? props.theme.palette.primary.main
            : props.theme.palette.secondary.main};
      }
    }

    &.Body {
      margin-top: ${props => props.theme.spacing.unit}px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-wrap: wrap;

      .Statistic {
        text-align: center;
        max-width: 90px;
        padding: 0 ${props => props.theme.spacing.unit / 2}px;

        &.CapturedDiscs {
          color: #64a2be;
          border-right: 2px solid #403f3f;
        }
        &.CapturedKings {
          color: #beac64;
        }
      }
    }
  }
`)
