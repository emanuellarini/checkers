import { expect, test } from '@playwright/test';

import { PlayerActions, PlayerActionsType } from './PlayerActions';

test.describe.configure({ mode: 'serial' });

test.describe('Mecahinics', () => {
  let playersActions: PlayerActionsType;

  test.beforeAll(async () => {
    playersActions = new PlayerActions();
    await playersActions.init();
  });

  test.afterAll(async () => {
    await playersActions.close();
  });

  test('creates the game and join the players', async () => {
    await playersActions.addPlayers();
    await playersActions.createAndJoinPlayers();
  });

  test('make movements - pt.1', async () => {
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 44,
      nextPosition: 37
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 19,
      nextPosition: 28
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 51,
      nextPosition: 44
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 21,
      nextPosition: 30
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 46,
      nextPosition: 39
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 14,
      nextPosition: 21
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 42,
      nextPosition: 33
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 5,
      nextPosition: 14
    });
  });

  test('make movements - pt.2', async () => {
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 37,
      nextPosition: 19,
      passTurn: false
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 19,
      nextPosition: 5
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 3,
      nextPosition: 12
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 33,
      nextPosition: 26
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 21,
      nextPosition: 28
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 5,
      nextPosition: 19,
      passTurn: false
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 19,
      nextPosition: 37
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 10,
      nextPosition: 19
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 26,
      nextPosition: 12
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 17,
      nextPosition: 26
    });
  });

  test('make movements - pt.3', async () => {
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 40,
      nextPosition: 33
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 8,
      nextPosition: 17
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 33,
      nextPosition: 19
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 1,
      nextPosition: 10
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 19,
      nextPosition: 1
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 14,
      nextPosition: 21
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 1,
      nextPosition: 10
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 7,
      nextPosition: 14
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 10,
      nextPosition: 24
    });
  });

  test('make movements - pt.4', async () => {
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 21,
      nextPosition: 28
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 37,
      nextPosition: 19
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 30,
      nextPosition: 37
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 44,
      nextPosition: 30
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 23,
      nextPosition: 37
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 55,
      nextPosition: 46
    });
    await playersActions.moveDisc({
      player: 1,
      currentPosition: 14,
      nextPosition: 21
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 46,
      nextPosition: 28,
      passTurn: false
    });
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 28,
      nextPosition: 14,
      passTurn: false
    });
  });

  test('has a winner', async () => {
    const wins = await playersActions.pages[0].textContent(
      '[aria-label="Wins"]'
    );
    expect(wins).toEqual('1');
    const discs = await playersActions.pages[0].textContent(
      '[aria-label="Discs"]'
    );
    expect(discs).toEqual('12');

    await playersActions.pages[0].isVisible(
      'div[role="presentation"] div[aria-label="Winner"]'
    );
    await playersActions.pages[1].isVisible(
      'div[role="presentation"] div[aria-label="Winner"]'
    );
    await playersActions.pages[0].isVisible('button[aria-label="Rematch"]');
    await playersActions.pages[1].isVisible('button[aria-label="Rematch"]');
  });

  test('can rematch after the win', async () => {
    await playersActions.pages[0].click('button[aria-label="Rematch"]');
    await playersActions.pages[0].isVisible(
      'div[role="presentation"] div[aria-label="Paused"]'
    );
    await playersActions.pages[1].click('button[aria-label="Rematch"]');
    await playersActions.pages[1].isHidden(
      'div[role="presentation"] div[aria-label="Paused"]'
    );
    const resetDiscs1 = await playersActions.pages[0].textContent(
      '[aria-label="Discs"]'
    );
    expect(resetDiscs1).toEqual('0');
    const resetDiscs2 = await playersActions.pages[1].textContent(
      '[aria-label="Discs"]'
    );
    expect(resetDiscs2).toEqual('0');

    // can see the red disc form player 1 in both pages
    await playersActions.getDisc(0, 1);
    await playersActions.getDisc(1, 1);
  });
});
