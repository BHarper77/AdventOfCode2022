import { readFile } from "fs/promises";

(async () => {
	const data = (await readFile("./input.txt")).toString().replace(/\r/g, "").split("\n").map((row) => row.split(""))
	
	const edgeTotal = (data.length * 2) + ((data[0].length - 2) * 2)

	console.log({ data })

	// for row in data (i)
	// for tree in trow (j)
	// if i == 0 or data.length then visible, continue
	// if j == 0 or row.length then visible, continue

	let totalVisible = 0

	for (const [i, row] of data.entries()) {
		for (const [j, tree] of row.entries()) {
			if (i === 0 || i === data.length - 1) {
				totalVisible++
				continue
			}

			if (j === 0 || j === row.length - 1) {
				totalVisible++
				continue
			}

			let isVisibleColumn = false

			for (const compareRow of data) {
				if (parseFloat(tree) < parseFloat(compareRow[j])) {
					isVisibleColumn = true
				}
				else {
					isVisibleColumn = false
					break
				}
			}

			let isVisibleRow = false

			for (const compareTree of row) {
				if (parseFloat(tree) < parseFloat(compareTree)) {
					isVisibleRow = true
				}
				else {
					isVisibleRow = false
					break
				}
			}

			if (isVisibleRow || isVisibleColumn) {
				totalVisible++
			}
		}
	}

	console.log({ totalVisible })
})();