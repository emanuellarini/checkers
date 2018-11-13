import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import AppBar from 'components/AppBar'
import Board from 'components/Board'
import Winner from 'components/WinnerAlert'
import Turn from 'components/Turn'
import Zoom from '@material-ui/core/Zoom'
import Notification from 'components/Notification'
import StyledGame from './styled'
import {withNamespaces} from 'react-i18next'
import {compose, setPropTypes} from 'recompose'

function Game({t}) {
  const fadeDelay = {transitionDelay: 700}
  const hint = {__html: t('hint.turn')}

  return (
    <StyledGame>
      <AppBar />

      <Zoom in appear style={fadeDelay}>
        <div className="Container">
          <Board />
          <Typography
            variant="caption"
            color="textSecondary"
            align="center"
            component="p"
            className="Hint"
          >
            <span dangerouslySetInnerHTML={hint} />
          </Typography>
        </div>
      </Zoom>

      <Winner />
      <Turn />
      <Notification />
    </StyledGame>
  )
}

const propTypes = {
  /**
   * The translation function
   */
  t: PropTypes.func.isRequired,
}

const enhance = compose(
  withNamespaces(),
  setPropTypes(propTypes),
)

export default enhance(Game)
