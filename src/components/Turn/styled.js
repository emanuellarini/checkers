import styled from 'styled-components'

export default styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  max-width: 280px;

  .Buttons {
    position: relative;
    height: 170px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .Buttons > div {
    display: flex;
    width: 220px;
    justify-content: space-between;
    align-items: center;
    margin: 1em;
    padding: 1em;
    transition: all 1s ease-in-out;
    transform: translateY(0);
    transition: transform 0.3s;
  }

  .Button {
    z-index: 4;
  }

  .Border {
    position: absolute;
    transform: translateY(-100%);
    border: 1px solid #ccc;
    height: 19px;
    z-index: 0;
    border-radius: 40px;
    transition: transform 0.3s;

    &.Player1 {
      transform: translateY(0px);
    }

    &.Player2 {
      transform: translateY(85px);
    }
  }
`
