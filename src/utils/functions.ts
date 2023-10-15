import type { Ref } from 'vue'

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

export const handleLoadMoreData = (dataLoaded: Ref<number>) => {
	window.addEventListener('scroll', () => {
		const scrollY = window.scrollY
		const windowHeight = window.innerHeight
		const documentHeight = document.documentElement.scrollHeight

		if (scrollY + windowHeight >= documentHeight - 200) {
			dataLoaded.value += 5
		}
	})
}

export const handleWorkerMessage = (
	msg: MessageEvent<any>,
	fileError: Ref<string>,
	jsonData: Ref<Array<Object> | Object | null>,
	loading: Ref<boolean>
) => {
	if (msg.data === 'error') {
		fileError.value = 'Invalid file. Please load a JSON file.'
	} else {
		jsonData.value = msg.data
		console.timeEnd('JsonRenderer')
	}
	loading.value = false
}

export const handleUploadedFile = (
	worker: Worker,
	e: Event,
	fileError: Ref<string>,
	jsonName: Ref<string>,
	loading: Ref<boolean>
) => {
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
		console.time('JsonRenderer')
		worker.postMessage(file)
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
