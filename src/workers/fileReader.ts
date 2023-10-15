import { isValidJson } from '../utils/functions'

onmessage = (msg) => {
	const file = msg.data
	const chunkSize = file.size / 100
	let data = ''
	let offset = 0

	const reader = new FileReader()

	reader.onload = (evt) => {
		const readerResult = evt.target?.result as string

		data += readerResult
		offset += chunkSize

		if (offset < file.size) {
			readNextChunk()
		} else {
			const jsonIsValid = isValidJson(data)

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
