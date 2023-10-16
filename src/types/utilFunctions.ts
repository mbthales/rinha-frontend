import type { Ref } from 'vue'

export interface HandleUploadedFileI {
	worker: Worker
	e: Event
	fileError: Ref<string>
	jsonName: Ref<string>
	loading: Ref<boolean>
}

export interface HandleWorkerMessageI {
	msg: MessageEvent<any>
	fileError: Ref<string>
	jsonData: Ref<Array<Object> | Object | null>
	loading: Ref<boolean>
}

export interface HandleJsonSliceI {
	jsonData: Record<string, any>
	loadedData: number
}

export interface HandleJsonArrayI {
	data: Record<string, any>
	arrayTemp: any[]
	loadedData: number
	maxDataToLoad: number
}

export interface HandleJsonObjectI {
	data: Record<string, any>
	objectTemp: Record<string, any>
	loadedData: number
	maxDataToLoad: number
}

export interface HandleJsonDataI {
	jsonData: Record<string, any>
	loadedData: number
	maxDataToLoad: number
}
