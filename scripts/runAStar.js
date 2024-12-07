// Import the A* algorithm
import { aStar } from "./aStar.js";

// Example grid and input
const grid = [
    [0, 0, 0, 1, 0],
    [1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
];
const start = [0, 0];
const goal = [0, 4];

// Run the A* algorithm
const result = aStar(grid, start, goal);
console.log("Shortest Distance:", result);
// console.log("Path:", result.path);