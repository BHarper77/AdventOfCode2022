import { readFile } from "fs/promises";

(async () => {
	// loop through input
	// create parent array
	// create child array for each elf 
	// loop through parent array, summing up each child array
	// find greatest value in parent array

	const data = (await readFile("./input.txt")).toString().replace(/\r/g, "").split("\n").map((number) => parseInt(number))

	const parentArray = []
	let currentElf = []

	for (const number of data) {
		if (isNaN(number)) {
			parentArray.push(currentElf)
			currentElf = []
		}
		else {
			currentElf.push(number)
		}
	}

	const summedParentArray = parentArray.map((elfArray) => elfArray.reduce((previousValue, currentValue) => previousValue + currentValue), 0)
	const sorted = summedParentArray.sort((a, b) => a > b ? -1 : 1)
	const greatestValue = sorted[0]
	const topThree = sorted[0] + sorted[1] + sorted[2] 

	console.log({ greatestValue, topThree })
})();