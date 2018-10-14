import React from 'react'
import PropTypes from 'prop-types'
import StyledDiv from './styled'
import {getSquareVariant} from './helpers'

/**
 * Visual representation of Board Squares
 * Dark and Light square variants are represented by coordinates x,y
 */
class Square extends React.Component {
  render() {
    const {coords, size, isDropping, children} = this.props
    const key = `board-square-${coords[0]}-${coords[1]}`

    return (
      <StyledDiv
        variant={getSquareVariant(coords[0], coords[1])}
        data-testid={key}
        size={size}
        isDropping={isDropping}
      >
        {children}
      </StyledDiv>
    )
  }
}

Square.defaultProps = {
  size: 80,
  disabledDrop: true,
  dragging: false,
}

Square.propTypes = {
  /**
   * The function who renders the Disc
   */
  children: PropTypes.object,

  /**
   * The coordinates represented by X and Y coordinates in Board
   */
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,

  /**
   * The size of Square sides
   */
  size: PropTypes.number.isRequired,

  /**
   * Determine if the Square is receiving a drop
   */
  isDropping: PropTypes.bool.isRequired,
}

export default Square
