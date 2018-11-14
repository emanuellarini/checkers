import styled from 'styled-components'
import withTheme from '@material-ui/core/styles/withTheme'

export default withTheme()(styled.div`
  && {
    color: white;
    width: 100%;
    max-width: 320px;
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
      display: flex;
      max-width: 320px;

      .Current,
      .Overall {
        flex: 1;
      }

      .Header {
        width: 100%;
        text-align: center;
        margin-bottom: 4px;
      }

      .Overall .Statistic {
        border-right: 1px solid #3c3a3a;
      }

      .Current .Statistic {
        border-left: 1px solid #3c3a3a;
      }

      .Statistic {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        text-align: center;

        > div {
          padding: 0 ${props => props.theme.spacing.unit * 2}px;
        }
        .Wins {
          color: green;
        }
        .Losses {
          color: #da3d3d;
        }
        .CapturedDiscs {
          color: #64a2be;
        }
        .CapturedKings {
          color: #beac64;
        }
      }
    }
  }
`)
