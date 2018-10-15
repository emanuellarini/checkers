:video_game: Let's play checkers! :video_game:

## Up & Running

1. **Clone the repo**

   ```sh
   $ git clone git@github.com:emanuellarini/checkers.git
   ```

2. **Install dependencies**

   ```sh
   $ yarn
   ```

3. **Run**:

   ```sh
   $ yarn start
   ```

4. **Run Tests**

   ```sh
   $ yarn test
   ```

## Intro

This is a Checkers game made in React for personal study.

You can follow the process on
[Trello](https://trello.com/b/mjk3IU7g/checkers-board)

Ops: Rules can change based on my mood :stuck_out_tongue_winking_eye:

## Game Description

Checkers is played by Two Players.

They begin the game with `12 Colored Discs` divided in two colors: `Red` and
`Grey`.

Each player places his or her pieces on the 12 dark squares closest to him or
her.

The Player who owns the Grey Discs moves first.

The moves are alternated and lose who cannot make a move!

## Game Components

### The Board

Consists of 64 (8x8) squares: `32 Dark` and `32 Light` squares.

It is positioned so that each player has a Light square on the right side corner
closest to him or her.

### The Common Discs

As mentioned before there are two types of Common Discs: Red and Grey.

They can:

- Move only in Dark squares (which means diagonally) and towards the enemy

- Capture one enemy Disc by leaping through it (only if there is an empty square
  to land)

- Capture towards and backwards the enemy

- Capture multiple enemy Disc by leaping through them

If a Disc gets Captured it is removed from the Board.

### The King Disc

A very special Disc which is created after a special condition: a common Disc
reach furthest row from the Player who controls it.

They can do same movements as Common Discs, but also:

- Move through many empty squares (diagonally) towards and backwards the enemy

- Can not jump over friendly Discs

## Lose Conditions

Lose the game who matches one of these statements:

- Get all Discs captured by the opponent
- Is not able to make a movement
- Have a Common Disc versus a King Disc from opponent
