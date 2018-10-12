:video_game: Let's play checkers! :video_game: 

# Intro

This is a Checkers game made in React for personal study. 

# Game Basics

Checkers is played by Two Players. 

They begin the game with `12 Colored Discs` divided in two colors: `Red` and `Black`. 

Each player places his or her pieces on the 12 dark squares closest to him or her. 

The Player who owns the Black Discs moves first. 

The moves are alternated and lose who cannot make a move!

# The Board

Consists of 64 (8x8) squares: `32 Dark` and `32 Light` squares. 

It is positioned so that each player has a Light square on the right side corner closest to him or her.

# The Common Discs

As mentioned before there are two types of Common Discs: Red and Black.

They can:

* Move only in Dark squares (which means diagonally) and towards the enemy

* Capture one enemy Disc by leaping through it (only if there is an empty square to land)

* Capture only one Disc in a multiple jump movement

If a Disc gets Captured it is removed from the Board.

# The King Disc

A very special Disc which is created after a special condition: a common Disc reach furthest row from the Player who controls it.

They can:

* Move through many empty squares (diagonally) and towards and backwards the enemy

* Capture multiple enemy Disc by leaping through them

* Capture more than one Disc in a multiple jump movement (if the move is possible)

# Rules

* Must follow the constraints explained in Kings or Common Disc section

* If a Player is able to do a Capture movement, he MUST do it. If there are more than one capture move, the Player can freely choose between one of them.

* Win the game who captured all opponent Discs OR the opponent is not able to make a movement OR have a Kings Disc versus a Common Disc
