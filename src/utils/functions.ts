import type {
	HandleUploadedFileI,
	HandleWorkerMessageI,
	HandleJsonArrayI,
	HandleJsonObjectI,
	HandleJsonDataI,
} from '../types/utilFunctions'

let arrayTemp: any[] = []
let objectTemp: Record<string, any> = {}

export const handleClassForProperty = (property: string | number) => {
	if (typeof property === 'string') {
		return 'text-blue'
	} else if (typeof property === 'number') {
		return 'text-gray'
	}
}

export const isValidJson = (item: string) => {
	try {
		const test = JSON.parse(item)
		return test
	} catch (e) {
		return false
	}
}

export const handleLoadMoreData = (worker: Worker) => {
	window.addEventListener('scroll', () => {
		const scrollY = window.scrollY
		const windowHeight = window.innerHeight
		const documentHeight = document.documentElement.scrollHeight

		if (scrollY + windowHeight >= documentHeight - 300) {
			worker.postMessage('')
		}
	})
}

export const handleWorkerMessage = (args: HandleWorkerMessageI) => {
	const { msg, fileError, jsonData, loading } = args

	if (msg.data === 'error') {
		fileError.value = 'Invalid file. Please load a JSON file.'
	} else {
		jsonData.value = msg.data
		console.timeEnd('JsonRenderer')
	}
	loading.value = false
}

export const handleUploadedFile = (args: HandleUploadedFileI) => {
	const { worker, e, fileError, jsonName, loading } = args

	const target = e.target as HTMLInputElement
	const files = target.files
	fileError.value = ''

	if (files) {
		const file = files[0]
		const fileType = file.type

		if (!fileType.includes('json')) {
			fileError.value = 'Invalid file. Please load a JSON file.'
		}

		jsonName.value = file.name

		loading.value = true
		worker.postMessage(file)
		console.time('JsonRenderer')
	}
}

export function handleJsonArray(args: HandleJsonArrayI) {
	const { data, arrayTemp, loadedData, maxDataToLoad } = args

	arrayTemp.push(...data.slice(loadedData, loadedData + maxDataToLoad))

	return arrayTemp
}

export function handleJsonObject(args: HandleJsonObjectI) {
	const { data, objectTemp, loadedData, maxDataToLoad } = args

	for (const key in data) {
		if (Array.isArray(data[key])) {
			objectTemp[key] = [
				...(objectTemp[key] || []),
				...data[key].slice(loadedData, loadedData + maxDataToLoad),
			]
		} else {
			objectTemp[key] = data[key]
		}
	}

	return objectTemp
}

export const handleJsonData = (args: HandleJsonDataI) => {
	const { jsonData, loadedData, maxDataToLoad } = args

	if (isArray(jsonData)) {
		arrayTemp = handleJsonArray({
			data: jsonData,
			arrayTemp,
			loadedData,
			maxDataToLoad,
		})

		postMessage(arrayTemp)
	} else if (isObject(jsonData)) {
		objectTemp = handleJsonObject({
			data: jsonData,
			objectTemp,
			loadedData,
			maxDataToLoad,
		})

		postMessage(objectTemp)
	}
}

export const isArray = (item: any) => {
	return item instanceof Array
}

export const isNotObject = (item: any) => {
	return typeof item != 'object' && !isArray(item)
}

export const isObject = (item: any) => {
	return typeof item == 'object' && !isArray(item)
}

export const isString = (item: any) => {
	return typeof item == 'string'
}

export const isNumberOrBoolean = (item: any) => {
	return typeof item === 'number' || typeof item === 'boolean'
}

export const isNull = (item: any) => {
	return item === null
}

export const formatPropertyValue = (item: any) => {
	return typeof item === 'string' ? `"${item}"` : item
}
