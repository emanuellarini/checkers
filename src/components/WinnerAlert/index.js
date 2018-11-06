import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import {
  compose,
  renderNothing,
  withStateHandlers,
  branch,
  pure,
  setPropTypes,
} from 'recompose'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

function WinnerAlert({open, player, onClose}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="winner-alert-dialog-slide-title"
      aria-describedby="winner-alert-dialog-slide-description"
    >
      <DialogTitle id="winner-alert-dialog-slide-title" disableTypography>
        <Typography variant="title" align="center">
          We have a Winner!
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="winner-alert-dialog-slide-description">
          The current winner is <b>Player {player}!</b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" fullWidth color="primary" onClick={onClose}>
          Play Again!
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const propTypes = {
  /**
   * Determine if the modal is opened
   */
  open: PropTypes.bool.isRequired,

  /**
   * Specify which player won
   */
  player: PropTypes.oneOf([null, 1, 2]).isRequired,

  /**
   * Callback to close modal
   */
  onClose: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    player: state.winner.player,
  }
}

const enhanceWinnerAlert = compose(
  withStateHandlers(({open = true}) => ({open}), {
    onClose: () => () => ({open: false}),
  }),
  setPropTypes(propTypes),
)

const enhance = compose(
  connect(mapStateToProps),
  branch(props => !props.player, renderNothing, enhanceWinnerAlert),
  pure,
)

export default enhance(WinnerAlert)
