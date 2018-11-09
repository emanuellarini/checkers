import styled from 'styled-components'

export default styled('div')`
  .Hint {
    width: 100%;
    margin: 24px 0;
  }

  .Container {
    margin: 24px auto;
    max-width: 560px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    > div:nth-child(1) {
      width: 400px;
    }

    > div:nth-child(2) {
      width: 280px;
      padding: 24px;
    }
  }
`
