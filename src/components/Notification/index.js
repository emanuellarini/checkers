import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import {connect} from 'react-redux'
import {closeNotification} from 'store/notification'
import {compose, setPropTypes, pure, defaultProps} from 'recompose'

function Notification({closeNotification, open, duration, message}) {
  const origin = {
    vertical: 'bottom',
    horizontal: 'left',
  }

  return (
    <Snackbar
      anchorOrigin={origin}
      open={open}
      autoHideDuration={duration}
      onClose={closeNotification}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={closeNotification}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  )
}

const defaults = {
  duration: 0,
  open: false,
  message: null,
}

const propTypes = {
  /**
   * Autohide duration in ms
   */
  duration: PropTypes.number.isRequired,

  /*
   * Determine if it is open
   */
  open: PropTypes.bool.isRequired,

  /**
   * The message
   */
  message: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    duration: state.notification.duration,
    open: state.notification.open,
    message: state.notification.message,
  }
}

const enhance = compose(
  defaultProps(defaults),
  connect(
    mapStateToProps,
    {closeNotification},
  ),
  setPropTypes(propTypes),
  pure,
)

export default enhance(Notification)
