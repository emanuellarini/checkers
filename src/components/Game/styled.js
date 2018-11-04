import styled from 'styled-components'

export default styled('div')`
  h1 {
    width: 100%;
    padding: 0.5em 0;
    background-color: #efefef;
  }

  .Container {
    margin: 0 auto;
    max-width: 900px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    > div:nth-child(1) {
      width: 400px;
      margin-top: 1em;
    }

    > div:nth-child(2) {
      width: 280px;
      padding: 2em;
    }
  }
`
