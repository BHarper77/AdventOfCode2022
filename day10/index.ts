import { readFile } from "fs/promises";

(async () => {
	const data = (await readFile("./input.txt")).toString().replace(/\r/g, "").split("\n")
	
	// loop through instructions
	// add empty strings to represent additional cycles
	for (let i = 0; i < data.length; i++) {
		const currentInstruction = data[i]

		if (currentInstruction.includes("addx")) {
			data.splice(i + 1, 0, "")
		}
	}

	// loop through updated data array
	// parent variable to track current register addition
	// add when current instruction is finished (string is no longer empty)
	let currentRegisterAdd = 0
	let registerValue = 1
	const signalStrengths: number[] = []

	for (const [index, instruction] of data.entries()) {
		// retrieve signal strength when index is hit
		if ([20, 60, 100, 140, 180, 220].includes(index)) {
			console.log({ index, registerValue })
			signalStrengths.push(index * registerValue)
		}

		// grab current addx value
		// continue to simulate multiple cycles
		if (instruction.includes("addx")) {
			const addition = instruction.match(/-?[0-9]+/g)

			if (addition === null) {
				throw new Error(`Error retrieving value from instruction ${instruction}`)
			}

			currentRegisterAdd = parseFloat(addition[0])
			continue
		}

		// after addx instruction is finished, add value to register
		if (instruction === "") {
			registerValue += currentRegisterAdd
		}
	}

	console.log({ signalStrengths })
	const total = signalStrengths.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
	console.log({ total })
})();