import { test } from '@playwright/test';

import { PlayerActions, PlayerActionsType } from './PlayerActions';

test.describe.configure({ mode: 'serial' });

test.describe('Room', () => {
  let playersActions: PlayerActionsType;

  test.beforeAll(async () => {
    playersActions = new PlayerActions();
    await playersActions.init();
  });

  test.afterAll(async () => {
    await playersActions.close();
  });

  test('user s not able to start a game without the second player', async () => {
    await playersActions.addPlayer();
    await playersActions.createAndJoinRoom();

    await playersActions.pages[0].isVisible(
      'div[role="presentation"] div[aria-label="Paused"]'
    );
    await playersActions.addPlayer();
    const roomId = playersActions.getRoomIdFromUrl(playersActions.pages[0]);
    await playersActions.joinRoom(playersActions.pages[1], roomId);
    await playersActions.pages[0].isHidden(
      'div[role="presentation"] div[aria-label="Paused"]'
    );
    await playersActions.pages[1].isHidden(
      'div[role="presentation"] div[aria-label="Paused"]'
    );
  });

  test('can leave the page and return to the game', async () => {
    // make a movement to check if game reloaded
    await playersActions.moveDisc({
      player: 0,
      currentPosition: 44,
      nextPosition: 37
    });
    await playersActions.pages[0].goto('https://www.google.com', {
      waitUntil: 'networkidle'
    });
    await playersActions.pages[0].goBack();
    await playersActions.getDisc(1, 37);
  });
});
