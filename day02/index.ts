import { readFile } from "fs/promises";

(async () => {
	const data = (await readFile("./input.txt")).toString().replace(/\r/g, "").split("\n").map((round) => round.split(" "))

	let runningScore = 0

	const rock = "A"
	const paper = "B"
	const scissors = "C"

	const win = "Z"
	const draw = "Y"
	const loss = "X"

	const rockScore = 1
	const paperScore = 2
	const scissorsScore = 3

	for (const [opp, roundEnd] of data) {
		if (opp === rock) {
			if (roundEnd === win) {
				// played paper
				runningScore += 6
				runningScore += paperScore
			}
			else if (roundEnd === draw) {
				// played rock
				runningScore += 3
				runningScore += rockScore
			}
			else if (roundEnd === loss) {
				// played scissors
				runningScore += 0
				runningScore += scissorsScore
			}
		}
		else if (opp === paper) {
			if (roundEnd === win) {
				// played scissors
				runningScore += 6
				runningScore += scissorsScore
			}
			else if (roundEnd === draw) {
				// played paper
				runningScore += 3
				runningScore += paperScore
			}
			else if (roundEnd === loss) {
				// played rock
				runningScore += 0
				runningScore += rockScore
			}
		}
		else if (opp === scissors) {
			if (roundEnd === win) {
				// played rock
				runningScore += 6
				runningScore += rockScore
			}
			else if (roundEnd === draw) {
				// played scissors
				runningScore += 3
				runningScore += scissorsScore
			}
			else if (roundEnd === loss) {
				// played paper
				runningScore += 0
				runningScore += paperScore
			}
		}
	}

	console.log({ runningScore })
})()