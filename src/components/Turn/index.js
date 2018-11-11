import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import StyledTurn from './styled'
import Slide from '@material-ui/core/Slide'
import ArrowRight from '@material-ui/icons/TrendingFlat'
import {
  compose,
  setPropTypes,
  withHandlers,
  lifecycle,
  onlyUpdateForKeys,
} from 'recompose'
import {endTurn} from 'store/movement'

function Turn({currentPlayer, canPassTurn, endTurn}) {
  const timeout = {
    enter: 300,
    exit: 500,
  }

  const color = currentPlayer === 1 ? 'primary' : 'secondary'

  return (
    <Slide
      direction="up"
      in={canPassTurn}
      mountOnEnter
      unmountOnExit
      timeout={timeout}
    >
      <Button
        variant="extendedFab"
        aria-label="Pass Turn"
        onClick={endTurn}
        color={color}
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
    spacebarPressed: props => e => {
      if (e.code === 'Space') {
        props.endTurn({player: props.currentPlayer})
      }
      e.preventDefault()
      e.stopPropagation()
    },
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
  onlyUpdateForKeys(['canPassTurn']),
)

export default enhance(Turn)
