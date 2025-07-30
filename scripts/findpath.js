const grid = [
    [0, 0, 0, 1, 0],
    [1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0]
];
const start = [0, 0];
const goal = [0, 4];

console.log(findpath(grid, start, goal)); 
// Distance of the path: 8
// (Optimal) Path: [0, 0] -> [0, 1] -> [0, 2] -> [1, 2] -> [2, 2] -> [2, 3] -> [2, 4] -> [1, 4] -> [0, 4]