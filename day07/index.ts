import { readFile } from "fs/promises";

const directoryTree: Record<string, string[]> = {

}

;(async () => {
	const data = (await readFile("./input.txt")).toString().replace(/\r/g, "").split("\n")

	let currentDir = ""

	// build directoryTree
	// each directory represented by property, with array containing child items
	for (const output of data) {
		if (output.includes("$")) {
			// user command
			if (output.includes("cd") && !output.includes("..")) {
				const dir = output.replace("$ cd ", "")
				directoryTree[dir] = []
				currentDir = dir
			}
		}
		else {
			directoryTree[currentDir].push(output.replace(" ", ""))
		}
	}

	console.log({ directoryTree })

	const totalSizes: number[] = []

	// iterate through tree, adding up total size of each directory
	for (const [index, value] of Object.entries(directoryTree)) {
		calculateDirectorySize(value)
	}

	console.log({ totalSizes })
})();

function calculateDirectorySize(currentTree: string[], totalSize = 0) {
	let currentDirSize = 0

	for (const value of currentTree) {
		if (value.includes("dir")) {
			const currentDir = value.replace("dir", "")
			totalSize += calculateDirectorySize(directoryTree[currentDir], totalSize)
			continue
		}
		
		const fileSize = value.match(/[0-9]+/g)

		if (fileSize) {
			// file, contains number
			currentDirSize += parseFloat(fileSize[0])
		}
	}

	return currentDirSize + totalSize
}