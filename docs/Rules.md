## Game Components

### The Board

Consists of 64 (8x8) squares: `32 Dark` and `32 Light` squares.

It is positioned so that each player has a Light square on the right side corner closest to him or her.

### The Common Discs

There are two types of Common Discs: Red and Grey, and each one represents a Player.

A Disc can:

- Move a Disc diagonally only in Dark squares and towards the enemy
- Capture one enemy Disc by leaping through it but only if there is an empty square to land
- Capture towards and backwards the enemy
- Capture multiple enemy Disc by leaping through them

### The King Discs

A very special Disc which is created after a special condition: a Common Disc
reach the furthest row from the Player who controls it.

They can do same movements as Common Discs but also move backwards.

## Win Conditions

Win the game who matches one of these statements:

- Captures all the opponent Discs
- Have one King Disc vs one opponent's Common Disc