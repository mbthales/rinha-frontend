const isJson = (item: string) => {
	try {
		const test = JSON.parse(item)
		return test
	} catch (e) {
		return false
	}
}

onmessage = (msg) => {
	const file = msg.data
	const chunkSize = 4500000
	let offset = 0
	let data = ''

	const reader = new FileReader()

	reader.onload = (evt) => {
		const readerResult = evt.target?.result as string

		data += readerResult
		offset += chunkSize

		if (offset < file.size) {
			readNextChunk()
		} else {
			const jsonIsValid = isJson(data)
			console.log(jsonIsValid)

			if (jsonIsValid) {
				postMessage(jsonIsValid)
			} else {
				postMessage('error')
			}
		}
	}

	const readNextChunk = () => {
		const blob = file.slice(offset, offset + chunkSize)
		reader.readAsText(blob)
	}

	readNextChunk()
}
