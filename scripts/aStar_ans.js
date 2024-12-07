export function aStar(grid, start, goal) {
    const openSet = new PriorityQueue();
    const gScore = new Map();
    const fScore = new Map();

    openSet.push(start, 0);
    gScore.set(start, 0);
    fScore.set(start, heuristic(start, goal));

    while (!openSet.isEmpty()) {
        const current = openSet.pop();

        if (current[0] === goal[0] && current[1] === goal[1]) {
            return gScore.get(current);
        }

        for (const neighbor of getNeighbors(grid, current)) {
            const tentativeGScore = gScore.get(current) + 1;

            if (!gScore.has(neighbor) ||tentativeGScore < gScore.get(neighbor)) {
                gScore.set(neighbor, tentativeGScore);
                fScore.set(neighbor, tentativeGScore + heuristic(neighbor, goal));
                openSet.push(neighbor, fScore.get(neighbor));
            }
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
        const [x, y] = [current[0] + dx, current[1] + dy];
        if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] === 0) {
            neighbors.push([x, y]);
        }
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