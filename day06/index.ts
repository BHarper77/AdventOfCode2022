import { readFile } from "fs/promises";

(async () => {
	const data = (await readFile("./input.txt")).toString().replace(/\r/g, "").split("")

	// loop through chars
	// grab each group of 4, beginning from current char
	// check for duplicate chars
	
	let foundPacket = false
	let foundMessage = false

	const messageLength = 14
	const packetLength = 4

	for (const [index, char] of data.entries()) {
		const packetGroup = data.slice(index, index + packetLength).join().replaceAll(",", "")
		const messageGroup = data.slice(index, index + messageLength).join().replaceAll(",", "")
		const packetDuplicates = packetGroup.match(/(.).*\1/g)
		const messageDuplicates = messageGroup.match(/(.).*\1/g)

		if (foundPacket === false && packetDuplicates === null) {
			// marker found
			const startOfPacket = data.join().replaceAll(",", "").indexOf(packetGroup) + packetLength
			console.log({ startOfPacket })
			foundPacket = true
		}

		if (foundMessage === false && messageDuplicates === null) {
			// marker found
			const startOfMessage = data.join().replaceAll(",", "").indexOf(packetGroup) + messageLength
			console.log({ startOfMessage })
			foundMessage = true
		}

		if (foundMessage === true && foundPacket === true) {
			break
		}
	}
})();