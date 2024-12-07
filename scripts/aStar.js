export function aStar(grid, start, goal) {
    const openSet = new PriorityQueue();
    const gScore = new Map();
    const fScore = new Map();

    openSet.push(start, 0);
    gScore.set(start, 0);
    fScore.set(start, heuristic(start, goal));

    while (!openSet.isEmpty()) {
        // TODO: Pop the node with the lowest fScore from the openSet

        // TODO: Check if the current node is the goal, if it is, return the distance from gScore

        // TODO: Get the neighbors of the current node

        for (const neighbor of getNeighbors(grid, current)) {
            // TODO: Calculate the tentative gScore for the neighbor

            // TODO: If this gScore is better than the previously recorded one, update gScore and fScore
            //       Push the neighbor into the openSet with its updated fScore
        }
    }

    return Infinity; // No path found
}

function heuristic(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function getNeighbors(grid, current) {
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const neighbors = [];

    for (const [dx, dy] of directions) {
        // TODO: Implement the logic to:
        // 1. Calculate the new position based on the direction.
        // 2. Check if the position is within grid bounds.
        // 3. Check if the cell at the position is passable (value 0).
        // 4. If valid, add the position to the neighbors list.
    }

    return neighbors;
}

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    push(item, priority) {
        this.elements.push({ item, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    pop() {
        return this.elements.shift().item;
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}