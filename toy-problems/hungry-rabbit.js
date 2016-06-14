/*
A very hungry rabbit is placed in the center of of a garden, represented by a rectangular N x M 2D matrix.

The values of the matrix will represent numbers of carrots available to the rabbit in each square of the garden. If the garden does not have an exact center, the rabbit should start in the square closest to the center with the highest carrot count.

On a given turn, the rabbit will eat the carrots available on the square that it is on, and then move up, down, left, or right, choosing the the square that has the most carrots. If there are no carrots left on any of the adjacent squares, the rabbit will go to sleep. You may assume that the rabbit will never have to choose between two squares with the same number of carrots.

Write a function which takes a garden matrix and returns the number of carrots the rabbit eats
*/

const sampleGarden = [[5, 7, 8, 6, 3],
                      [0, 0, 7, 0, 4],
                      [4, 6, 3, 4, 9],
                      [3, 1, 0, 5, 8]];

const eatGarden = function eat(garden) {
  // Set the garden height and width after ensuring the garden and first garden row exist.
  // If either do not exist, set the respective dimension to 0.
  const height = garden ? garden.length : 0;
  const width = garden[0] ? garden[0].length : 0;

  // If the garden height or width is 0, then the rabbit consumes 0 carrots.
  if (height === 0 || width === 0) { return 0; }

  // Find the correct coordinates for the rabbit to start on, which is an object with two properties x and y, which store integers referring to x and y coordinates.
  const initCoords = _findCoordsForMaxCenterOfMatrix(garden, width, height);

  // The rabbit will need to make an unknown number of decisions, so let's use recursion. Write a recursive function that simulates a "turn", which involves eating the carrots present and then choosing the next square to visit.
  const recursivelyEatGarden = function recursivelyEatGarden(coords) {
    // Find the number of carrots at the current loc.
    const carrots = garden[coords.x, coords.y];

    // Check if adjacent locations are undefined. If they are, there are 0 carrots there because the location doesn't exist. Otherwise, set the number of carrots equal to the number actually present.
    const up = coords.y + 1 >= height ? 0 : garden[coords.x, coords.y + 1];
    const down = coords.y - 1 < 0 ? 0 : garden[coords.x, coords.y - 1];
    const left = coords.x - 1 < 0 ? 0 : garden[coords.x - 1, coords.y];
    const right = coords.x + 1 >= width ? 0 : garden[coords.x + 1, coords.y];

    const maxCarrots = Math.max(up, down, left, right);

    // Determine coordinates of next location to visit.
    switch (maxCarrots) {
      case up:
        const nextCoords = { x: coords.x, y: coords.y + 1 };
        break;
      case down:
        const nextCoords = { x: coords.x, y: coords.y - 1 };
        break;
      case left:
        const nextCoords = { x: coords.x - 1, y: coords.y };
        break;
      case right:
        const nextCoords = { x: coords.x + 1, y: coords.y };
        break;
      default:
        // If there are no more carrots to be consumed, return 0 because the rabbit will sleep.
        return 0;
    }

    // Return the sum of the current carrots plus the carrots from the next location.
    return carrots + recursivelyEatGarden(nextCoords);
  }

}

// Helper function that returns an object { x: Int, y: Int } representing the coordinates of the max central value of an arbitrary matrix.
const _findCoordsForMaxCenterOfMatrix = function _findCoordsForMaxCenterOfMatrix(matrix, dimX, dimY) {
  // Find the initX coordinate.
  if (dimX % 2 === 0) {
    const xCandidate1 = dimX / 2;
    const xCandidate2 = xCandidate1 - 1;
  } else {
    let initX = Math.floor(dimX / 2);
  }

  // Find the initY coordinate.
  if (dimY % 2 === 0) {
    const yCandidate1 = dimY / 2;
    const yCandidate2 = yCandidate1 - 1;
  } else {
    let initY = Math.floor(dimY / 2);
  }

  // TODO: If initX and initY are both undefined, compare resulting four candidates and return a tuple with the [x,y] coordinates of the largest.
  // TODO: If initX exists and initY is undefined, compare resulting two candidates and return a tuple.
  // TODO: Similarly, if initY exists and initX is undefined then compare the two candidates and return a tuple.

  // If both initX and initY are defined, return a tuple with [initX, initY].
  return { x: initX, y: initY };
}
