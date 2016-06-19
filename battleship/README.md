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

---

#### Option 1

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
| Pro | Con |
| ---- | ---- |
| Maps really well to the real-world representation. Easy to reason about. | Checking if sinks are sunk is not easily done. Requires finding the adjacent ships or storing the location of each other ship piece on the ship.|

---

#### Option 2

We can instead just store the location of each player's ships in state. Ships will include a number of coordinate tuples. This way, we simply pass the clicked tile's x and y coordinates in and check if they are the same as any of the opposing player's ships.

This is more efficient because we will, by default, never be checking open water for a ship. This is especially helpful because it decouples the check for a sunk ship from the board size.

Specifically, state will look as follows:
```
{
  ships: {
    p1: [
      {
        isSunk: Bool,
        coordinates: [
          {
            x: Int,
            y: Int,
            isHit: Bool
          }, ...
        ]
      }, ...
    ],
    p2: [ ... ]
  },
  playerTurn: Int,
}
```
This state structure is easy to reason about and doesn't require us to check every spot on the map for a ship.

Additionally, this makes it easier to check if all player's ships are sunk. We simply iterate over the player's ships and check if any have `isSunk === false`.

---

#### Decision: Option 2

Option 1's time complexity scales with the size of the board; Option 2 scales with the number and size of the ships, which must always be equal to or smaller than the number of tiles on the board (otherwise, you would have a case where ships are overlapping).

### App Flow
The following needs to happen from the application perspective:
1. Create a new game
·· 1. Initialize two players
·· 2. Set turn to Player 1
·· 3. Randomly place 5 ships for each player in a non-overlapping way
2. Players take turns clicking a tile
·· - When a player clicks a tile, check if the x and y coordinates of the tile match the x and y coordinates of any of the opposing player's ships.
·· - If the player hits an opposing tile, set `isHit` to `true` and...
·· ·· - Check if all the other coordinates of the ship are hit. If they are, then the ship is sunk.
·· ·· ·· - Check if all the opposing player's ships are sunk. If so, the current player wins the game.
3. A player wins the game. Show this in the state and provide a button to play again, which starts back at Step 1.
