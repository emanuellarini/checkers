import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

import { getDropXYCoords } from './utils';

type MoveDisc = {
  player: PlayerKey;
  currentPosition: Position;
  nextPosition: Position;
  passTurn?: boolean;
};

type PlayerFormData = {
  name: string;
  email: string;
};

export type PlayerActionsType = {
  browser: Browser | undefined;
  context: BrowserContext | undefined;
  pages: Page[];
  homeUrl: string;
  init: () => Promise<void>;
  close: () => Promise<void>;
  addPlayer: () => Promise<void>;
  addPlayers: () => Promise<void>;
  goToHome: (players?: PlayerKey[]) => Promise<void>;
  createAndJoinRoom: () => Promise<void>;
  joinRoom: (
    page: Page,
    roomId: string,
    playerData?: PlayerFormData
  ) => Promise<void>;
  getRoomIdFromUrl: (page: Page) => string;
  createAndJoinPlayers: () => Promise<void>;
  moveDisc: (data: MoveDisc) => Promise<void>;
  getDisc: (player: PlayerKey, position: Position) => Promise<void>;
};

export class PlayerActions implements PlayerActionsType {
  browser: PlayerActionsType['browser'];
  context: PlayerActionsType['context'];
  pages: PlayerActionsType['pages'] = [];
  homeUrl = 'http://localhost:3000';

  async init() {
    this.browser = await chromium.launch();
  }

  async close() {
    await this.browser?.close();
  }

  async addContext() {
    this.context = await this.browser?.newContext({
      viewport: { width: 1600, height: 1600 }
    });
  }

  async addPlayer() {
    await this.addContext();
    if (!this.context) return;
    this.pages.push(await this.context.newPage());
  }

  async addPlayers() {
    await this.addContext();
    if (!this.context) return;
    await this.context.newPage();
    await this.context.newPage();
    this.pages = this.context.pages();
  }

  async goToHome(players = [0]) {
    await this.pages[players[0]].goto(this.homeUrl);
    if (this.pages.length > 1 && players.length > 1) {
      await this.pages[players[1]].goto(this.homeUrl);
    }
  }

  async createAndJoinRoom() {
    await this.goToHome();
    await this.pages[0].fill('input[name="name"]', 'Test Test');
    await this.pages[0].fill('input[name="email"]', 'test@test.com');
    await this.pages[0].click('button[type="submit"]');
    await this.pages[0].waitForNavigation();
  }

  async joinRoom(page: Page, roomId: string, playerData?: PlayerFormData) {
    const { name = 'Test 2', email = 'test2@test.com' } = playerData || {};

    await page.goto(`${this.homeUrl}/${roomId}`);
    await page.fill('input[name="name"]', name);
    await page.fill('input[name="email"]', email);
    await page.click('button[type="submit"]');
  }

  getRoomIdFromUrl(page: Page) {
    return page.url().split('/').reverse()[0];
  }

  async createAndJoinPlayers() {
    await this.createAndJoinRoom();
    const roomId = this.getRoomIdFromUrl(this.pages[0]);
    await this.joinRoom(this.pages[1], roomId);
    await this.pages[1].waitForLoadState();
  }

  async getDisc(player: PlayerKey, position: Position) {
    await this.pages[player].waitForSelector(
      `div[data-rbd-droppable-id="square-${position}"] > div[aria-label="Disc"]`
    );
  }

  async moveDisc({
    player,
    currentPosition,
    nextPosition,
    passTurn = true
  }: MoveDisc) {
    await this.pages[0].isHidden('div[role="presentation"]');
    await this.pages[1].isHidden('div[role="presentation"]');

    const currentPositionSelector = `div[data-rbd-droppable-id="square-${currentPosition}"] > div[aria-label="Disc"]`;
    const nextPositionSelector = `div[data-rbd-droppable-id="square-${nextPosition}"]`;

    const currentPositionElement = await this.pages[player].waitForSelector(
      currentPositionSelector
    );
    const nextPositionElement = await this.pages[player].waitForSelector(
      nextPositionSelector
    );
    const currentPositionBound = await currentPositionElement.boundingBox();
    const nextPositionBound = await nextPositionElement.boundingBox();

    if (!currentPositionBound || !nextPositionBound) throw Error('No Element!');

    await this.pages[player].mouse.move(
      currentPositionBound.x,
      currentPositionBound.y,
      { steps: 10 }
    );

    await this.pages[player].dispatchEvent(
      currentPositionSelector,
      'mousedown',
      {
        button: 0,
        force: true
      }
    );
    const { x, y } = getDropXYCoords(
      player,
      currentPosition,
      nextPosition,
      nextPositionBound
    );
    await this.pages[player].mouse.move(x, y, { steps: 10 });
    await this.pages[player].dispatchEvent(nextPositionSelector, 'mouseup', {
      button: 0
    });

    await this.getDisc(player, nextPosition);

    try {
      if (passTurn) {
        await this.pages[player].keyboard.press('Enter');
      }
    } catch (e) {
      const message = `Unable pass turn of player ${player} after moving from ${currentPosition} to ${nextPosition}`;
      console.error(message);
      throw new Error(message);
    }
  }
}
