import { readFile } from "fs/promises";

(async () => {
	const data = (await readFile("./input.txt")).toString().replace(/\r/g, "").split("\n")

	const pairs = data.map((pair) => pair.split(","))

	/** First challenge total */
	let fullOverlapTotal = 0
	/** Second challenge total */
	let partialOverlapTotal = 0

	for (const [firstElf, secondElf] of pairs) {
		const [firstStart, firstEnd] = firstElf.split("-").map((string) => parseInt(string))
		const [secondStart, secondEnd] = secondElf.split("-").map((string) => parseInt(string))

		const isFullOverlap = 
			(firstStart <= secondStart && firstEnd >= secondEnd) ||
			(firstStart >= secondStart && firstEnd <= secondEnd)

			
		if (isFullOverlap === true) {
			fullOverlapTotal++
			partialOverlapTotal++
			continue
		}
		else {
			// if either first range values are in-between second range, partial overlap is true
			const isPartialOverlap = 
				(firstStart >= secondStart && firstStart <= secondEnd) ||
				(firstEnd >= secondStart && firstEnd <= secondEnd)

			isPartialOverlap ? partialOverlapTotal++ : null
		}
	}

	console.log({ fullOverlapTotal, partialOverlapTotal })
})();