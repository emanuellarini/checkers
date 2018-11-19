const utils = require('../utils/index')

describe('The Game Movements', () => {
  test('player 1 can move its disc to the upper right square towards opponent', async () => {
    const page = await utils.initializeBrowser()

    const dropSquare = await page.waitForSelector(
      '[data-testid="board-square-4-3"]',
    )
    const player1Disc = await page.waitForSelector(
      '[data-testid="board-square-5-2"]',
    )
    const dropSquareBox = await dropSquare.boundingBox()
    const player1DiscBox = await player1Disc.boundingBox()

    await page.mouse.move(
      player1DiscBox.x + player1DiscBox.width / 2,
      player1DiscBox.y + player1DiscBox.height / 2,
    )
    await page.mouse.down()
    await page.mouse.move(
      dropSquareBox.x + dropSquareBox.width / 2,
      dropSquareBox.y + dropSquareBox.height / 2,
      {steps: 6},
    )
    await page.mouse.up()
    await page.waitFor(100)

    const dropSquareHTML = await page.$eval(
      '[data-testid="board-square-4-3"]',
      e => e.innerHTML,
    )

    expect(dropSquareHTML).toContain('disc-player-1-grey2')
  })
})
