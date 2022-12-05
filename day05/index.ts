import { readFile } from "fs/promises";

(async () => {
	// use FILO arrays to store crate stacks
	// parent object to store arrays and their corresponding index
	const data = (await readFile("./input.txt")).toString().replace(/\r/g, "").split("\n")

	// TODO: don't hardcode
	const stacks = {
		1: ["R", "N", "P", "G"],
		2: ["T", "J", "B", "L", "C", "S", "V", "H"],
		3: ["T", "D", "B", "M", "N", "L"],
		4: ["R", "V", "P", "S", "B"],
		5: ["G", "C", "Q", "S", "W", "M", "V", "H"],
		6: ["W", "Q", "S", "C", "D", "B", "J"],
		7: ["F", "Q", "L"],
		8: ["W", "M", "H", "T", "D", "L", "F", "V"],
		9: ["L", "P", "B", "V", "M", "J", "F"]
	}

	// slice to ignore stacks
	const moves = data.slice(10).map((move) => {
		// extract numbers from each move
		const numbers = move.match(/[0-9]+/g)

		if (numbers === null) {
			throw new Error(`Couldn't parse move: ${move}`)
		}

		return {
			numberOfCrates: parseFloat(numbers[0]),
			source: parseFloat(numbers[1]),
			destination: parseFloat(numbers[2])
		}
	})

	for (const { numberOfCrates, source, destination } of moves) {
		let crates = []

		for (let i = 0; i < numberOfCrates; i++) {
			const crate = stacks[<keyof typeof stacks>source].pop() 

			if (crate === undefined) {
				throw new Error(`Crate is undefined on move ${ { numberOfCrates, source, destination } }`)
			}

			crates.push(crate)
		}

		crates.reverse()
		stacks[<keyof typeof stacks>destination].push(...crates)
	}

	const topCrates = Object.values(stacks).map((stack) => stack.at(-1)).join().replaceAll(",", "")
	console.log({ topCrates })
})();