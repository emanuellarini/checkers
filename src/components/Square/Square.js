import React from 'react'
import PropTypes from 'prop-types'
import StyledDiv from './styled'

/**
 * Visual representation of Board Squares
 * Dark and Light square variants are represented by coordinates x,y
 */
class Square extends React.PureComponent {
  render() {
    const {children} = this.props

    return <StyledDiv {...this.props}>{children}</StyledDiv>
  }
}

Square.defaultProps = {
  size: 80,
  isDropping: false,
  variant: 'light',
}

Square.propTypes = {
  /**
   * The function who renders the Disc
   */
  children: PropTypes.object,

  /**
   * The size of Square sides
   */
  size: PropTypes.number.isRequired,

  /**
   * Determine if the Square is receiving a drop
   */
  isDropping: PropTypes.bool.isRequired,

  /**
   * The variant type of Square
   */
  variant: PropTypes.oneOf(['light', 'dark']).isRequired,
}

export default Square
