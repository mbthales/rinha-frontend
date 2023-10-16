import { isValidJson, handleJsonData } from '../utils/functions'

let jsonData: any[] | Record<string, any> | null = null
let loadedData = 0
const maxDataToLoad = 5

onmessage = (msg) => {
	const file = msg.data

	if (jsonData !== null) {
		handleJsonData({ jsonData, loadedData, maxDataToLoad })

		loadedData += maxDataToLoad
	} else {
		const reader = new FileReader()

		reader.onload = (evt) => {
			const readerResult = evt.target?.result as string
			const data = readerResult

			jsonData = isValidJson(data)

			if (jsonData) {
				handleJsonData({ jsonData, loadedData, maxDataToLoad })

				loadedData += maxDataToLoad
			} else {
				postMessage('error')
			}
		}
		reader.readAsText(file)
	}
}
