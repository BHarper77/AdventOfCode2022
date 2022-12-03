import { readFile } from "fs/promises";

(async () => {
	const data = (await readFile("./input.txt")).toString().replace(/\r/g, "").split("\n")

	// create parent array containing child arrays with rucksack compartments
	const compartmentSplits = data.map((rucksack) => {
		const firstHalf = rucksack.substring(0, rucksack.length / 2)
		const secondHalf = rucksack.substring(rucksack.length / 2, rucksack.length)
		return [firstHalf, secondHalf]
	})

	// generate tuple data structure to store item type priorities
	/*
	[
		["a", 1],
		["b", 2],
		etc
	]
	*/
	const lowerCaseAlphabet = [...Array(26).keys()].map((index) => String.fromCharCode(index + 97))
	const upperCaseAlphabet = [...Array(26).keys()].map((index) => String.fromCharCode(index + 65))

	// combine two alphabets and create a tuple for each, containing corresponding priority value
	// explicitly type tuple so inference can pick it up for later
	const valuesTuple: [string, number][] = [...lowerCaseAlphabet, ...upperCaseAlphabet]
		.map((char, index) => [char, index + 1])

	let totalPriority = 0

	// loop through each rucksack, check compartments for duplicate item types
	for (const [first, second] of compartmentSplits) {
		const alreadyChecked: string[] = []
		
		for (const char of first) {
			if (alreadyChecked.includes(char)) {
				continue
			}

			if (second.includes(char)) {
				// duplicate found
				totalPriority += getTupleValue(char)

				// add items already checked to avoid duplicate addition
				alreadyChecked.push(char)
			}
		}
	}

	let currentGroup: string[] = []
	let totalPriorityBadges = 0

	for (const rucksack of data) {
		currentGroup.push(rucksack)

		if (currentGroup.length === 3) {
			// have 3 rucksacks, find badge item and reset counters
			const badgeType = [...currentGroup[0]]
				.filter((char) => currentGroup[1].includes(char) && currentGroup[2].includes(char))[0]

			totalPriorityBadges += getTupleValue(badgeType)

			currentGroup = []
			continue
		}
	}	

	console.log({ totalPriority, totalPriorityBadges })

	function getTupleValue(char: string): number {
		const value = valuesTuple.find(([tupleChar]) => tupleChar === char)

		if (value === undefined) {
			throw new Error(`Error finding tuple value for character: ${char}`)
		}

		return value[1]
	}
})();