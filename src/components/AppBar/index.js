import React from 'react'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HelpIcon from '@material-ui/icons/Help'

function AppBar() {
  return (
    <MuiAppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
          Checkers Game
        </Typography>

        <IconButton onClick={() => null} color="inherit">
          <HelpIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar
