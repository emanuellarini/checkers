import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import StyledTurn from './styled'
import Slide from '@material-ui/core/Slide'
import ArrowRight from '@material-ui/icons/TrendingFlat'
import {compose, pure, setPropTypes, withHandlers, lifecycle} from 'recompose'
import {endTurn} from 'store/movement'

function Turn({currentPlayer, canPassTurn, endTurn}) {
  return (
    <Slide
      key="slide-enabled"
      direction="left"
      in={canPassTurn}
      mountOnEnter
      unmountOnExit
    >
      <Button
        variant="extendedFab"
        aria-label="Pass Turn"
        onClick={endTurn}
        color="primary"
        size="large"
        component={StyledTurn}
      >
        Pass My Turn
        <ArrowRight className="Icon" />
      </Button>
    </Slide>
  )
}

const propTypes = {
  /**
   * The current player
   */
  currentPlayer: PropTypes.oneOf([1, 2]).isRequired,

  /**
   * Determine if player can pass his turn
   */
  canPassTurn: PropTypes.bool.isRequired,

  /**
   * Callback to end current player turn
   */
  endTurn: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    currentPlayer: state.turns.currentPlayer,
    canPassTurn: state.movement.movementCount !== 0,
  }
}

const enhance = compose(
  connect(
    mapStateToProps,
    {endTurn},
  ),
  withHandlers({
    spacebarPressed: props => e =>
      e.code === 'Space' ? props.endTurn() : false,
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener('keydown', this.props.spacebarPressed)
    },
    componentWillUnmount() {
      window.removeEventListener('keydown', this.props.spacebarPressed)
    },
  }),
  setPropTypes(propTypes),
  pure,
)

export default enhance(Turn)
