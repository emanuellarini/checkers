import styled from 'styled-components'
import withTheme from '@material-ui/core/styles/withTheme'

export default withTheme()(styled.div`
  overflow: hidden;

  .Container {
    margin: 16px auto;
    max-width: 560px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;

    .Hint {
      margin: ${props => props.theme.spacing.unit}px;
      text-align: center;
      text-transform: uppercase;
    }
  }
`)
