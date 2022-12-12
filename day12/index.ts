import { readFile } from "fs/promises"

(async () => {
	const data = (await readFile("./input.txt")).toString().replace(/\r/g, "").split("\n").map((line) => line.split(""))

	const numberOfCols = data[0].length
	const numberOfRows = data.length

	type TPosition = [number, number]

	// get start and end positions, then change them to elevation values
	let start: TPosition = [0, 0], end: TPosition = [0, 0]

	for (let row = 0; row < numberOfRows; row++) {
		for (let col = 0; col < numberOfCols; col++) {
			if (data[row][col] === "S") {
				// found start position
				start = [row, col]
				data[row][col] = "a"
			}
			else if (data[row][col] === "E") {
				// found end position
				end = [row, col]
				data[row][col] = "z"
			}
		}
	}

	// use breadth first search to find shortest path
	const directions: TPosition[] = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	]

	// helper funcs
	/** Convert positions to string for adding to set */
	function posToStr([row, col]: TPosition) {
		return `${row} ${col}`
	}

	function isValidPos([row, col]: TPosition) {
		return row >= 0 && row < numberOfRows && col >= 0 && col < numberOfCols
	}

	function bfs(start: TPosition) {
		const queue: [TPosition, number][] = [[start, 0]]
		// only add strings to set as objects/arrays are all different
		const visited = new Set(posToStr(start))
	
		while (queue.length > 0) {
			const [position, steps] = queue.shift() ?? [null, null]
	
			if (position === null || steps === null) { 
				throw new Error("Position or steps is null")
			}
	
			// check if end has been found
			if (posToStr(position) === posToStr(end)) {
				return steps
			}
	
			// check surrounding positions and add to queue
			directions.map(([dRow, dCol]) => [position[0] + dRow, position[1] + dCol] as TPosition)
				// filter positions that are inside the grid
				.filter((position) => isValidPos(position))
				// filter for positions that are one elevation higher
				.filter(([dRow, dCol]) => data[dRow][dCol].charCodeAt(0) - data[position[0]][position[1]].charCodeAt(0) <= 1)
				// ensure it's not already been visited
				.filter((pos) => !visited.has(posToStr(pos)))
				.forEach((pos) => {
					visited.add(posToStr(pos))
					queue.push([pos, steps + 1])
				})
		}
	}

	// part 2, run for each possible start position
	const starts: TPosition[] = Array.from({ length: numberOfRows }, (_, row) => 
		Array.from({ length: numberOfRows }, (_, col) => [row, col] as TPosition))
			.flat()
			// filter on positions "a"
			.filter(([row, col]) => data[row][col] === "a")

	const steps: number[] = []

	starts.forEach((start) => {
		const currentSteps = bfs(start)
		if (currentSteps !== undefined) steps.push(currentSteps)
	})
	
	const minSteps = Math.min(...steps)
	console.log({ minSteps })
})();