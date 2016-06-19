# Battleship

## Planning
First, I'm thinking about what components I'm going to need. We'll want a main application component that will need to store state. I'm thinking the sub-components can be purely presentational.

We'll need a info/header sub-component, which will store the score, number of ships remaining, and player turn. At this point, I'm thinking it will be beneficial to flesh out the gameplay so we can keep that in mind when designing the app.

---

### Gameplay
Application loads, randomly placing 5 ships for each player. Ships must be placed such that they do not overlap. The 5 ships are 5, 4, 3, 2, and 1 unit(s) in length. There are two players. Initially, 0 ships have been sunk. It is Player One's (P1's) turn.

P1 clicks on one of the squares to try and destroy part of Player Two's (P2's) fleet. If P1 doesn't hit one of P2's ships, then nothing happens. If P1 does hit one of P2's ships, then the square should be marked so both players understand that one of P2's ships is there and that it is "hit".

Now, it is P2's turn. P2 does the same as P1. This continues until all ships are sunk. A ship is sunk when all squares representing that ship are "hit" by the opposing player. When P1 or P2 hits the final square of an unsunk ship, the UI should show that the ship has been sunk completely and the number of ships sunk (displayed in a scoreboard of sorts) should increment.

Whichever player sinks all of the opposing player's ships first wins the game. When this happens, the UI should show the winner and provide an option to play again.

---

I think the original architecture I had in mind makes sense. One info/header sub-component and a board sub-component, which will be the primary area for gameplay. Here's a summary of the component structure:

- App
·· - Header
·· - Board
·· ·· - Tile (many)

The Board sub-component will have Tile sub-components that represent one unit of a ship/open water. Next, it's a good idea to explicitly note what we'll store in state.

---

### What's in State?

We can represent the board as an N by N matrix. By default, the board size will be 10 by 10. This will be stored in state as an array of arrays. Each index of the array will be either...
- null (open water)
- Object (a ship or piece of a ship)

The object will take the following shape:
```
{
  owner: Int,
  shipSize: Int,
  isHit: Bool,
  isSunk: Bool,
}
```
In addition, we'll need to track who's turn it is in state as well. By default this should be set to P1.

### App Flow
The following needs to happen from the application perspective:
1. Create a new game
·· 1. Initialize two players
·· 2. Set turn to Player 1
·· 3.
