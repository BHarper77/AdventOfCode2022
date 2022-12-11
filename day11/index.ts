import { readFile } from "fs/promises";

(async () => {
	const data = (await readFile("./input.txt")).toString().replace(/\r/g, "").split("\n")
	
	/*
	parse data:
		for each monkey:
			items: []
			operation: { operation: "+|/|*", value: number }
			test: divisible by value
				true/false: send to monkey number

	loop through monkeys 20 times, processing each operation
	every time an item is inspected, iterate inspectCounter
	*/

	type TMonkey = {
		id: number
		items: number[],
		operation: {
			operator: "*" | "+",
			value: number | "old"
		},
		test: {
			value: number,
			ifTrueMonkey: number,
			ifFalseMonkey: number,
		},
		inspectionCounter: number
	}

	let currentMonkey: string[] = []
	const monkeys: TMonkey[] = []

	for (const line of data) {
		if (line === "") continue
		// add lines to array in groups of 6
		// to create each monkey object
		currentMonkey.push(line)

		if (currentMonkey.length === 6) {
			currentMonkey = currentMonkey.map((line) => line.trim())
			// create monkey object
			const id = parseFloat(currentMonkey[0].split(" ")[1].replace(":", ""))
			const items = currentMonkey[1].replace("Starting items: ", "").split(", ").map((str) => parseFloat(str))
			const [operator, value] = currentMonkey[2].replace("Operation: new = old ", "").split(" ")
			const testValue = parseFloat(currentMonkey[3].replace("Test: divisible by ", ""))
			const ifTrue = parseFloat(currentMonkey[4].replace("If true: throw to monkey ", ""))
			const ifFalse = parseFloat(currentMonkey[5].replace("If false: throw to monkey ", ""))

			monkeys.push({
				id,
				items,
				operation: {
					operator: <"*" | "+">operator,
					value: <number | "old">value
				},
				test: {
					value: testValue,
					ifTrueMonkey: ifTrue,
					ifFalseMonkey: ifFalse
				},
				inspectionCounter: 0
			})

			currentMonkey = []
		}
	}

	/*
	loop through monkeys
		loop through items
			carry out operation
			divide worry by 3
			carry out test
			increment inspection counter
	*/

	let mod = 1

	monkeys.forEach((monkey) => mod *= monkey.test.value)

	console.log({ mod })

	for (let round = 0; round < 10000; round++) {
		for (const monkey of monkeys) {
			const length = monkey.items.length
			
			for (let i = 0; i < length; i++) {
				const item = monkey.items[0]

				// operation 
				let value = monkey.operation.value === "old" ? item : monkey.operation.value
				
				if (typeof value === "string") {
					value = parseFloat(value)
				}

				// calc new worry level using operation, divide by 3
				const newWorryLevel = Math.floor((monkey.operation.operator === "*" ? value * item : value + item)) % mod
				
				monkey.items.shift()
				
				const destMonkey = newWorryLevel % monkey.test.value === 0 ? 
					monkey.test.ifTrueMonkey :
					monkey.test.ifFalseMonkey
				
				monkeys[destMonkey].items.push(newWorryLevel)
	
				monkey.inspectionCounter++
			}
		}
	}

	const inspections = monkeys.map((monkey) => monkey.inspectionCounter).sort((a, b) => a > b ? -1 : 1)
	console.log({ inspections })
	const monkeyBusiness = inspections[0] * inspections[1]
	console.log({ monkeyBusiness })
})();