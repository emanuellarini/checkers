import styled from 'styled-components'
import withTheme from '@material-ui/core/styles/withTheme'

export default withTheme()(styled('div')`
  && {
    position: absolute;
    bottom: ${props => props.theme.spacing.unit * 2}px;
    right: ${props => props.theme.spacing.unit * 2}px;
  }

  .Icon {
    margin-left: ${props => props.theme.spacing.unit}px;
  }
`)
