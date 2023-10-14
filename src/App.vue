<script setup lang="ts">
import { ref, onMounted } from 'vue'

import JsonRenderer from './components/JsonRenderer.vue'

const worker = new Worker(new URL('./workers/fileReader.ts', import.meta.url), {
	type: 'module',
})

const fileError = ref<String | null>(null)
const jsonData = ref<Array<Object> | Object | null>(null)
const jsonName = ref('')
const loading = ref(false)
const dataLoaded = ref(5)

const handleFile = (e: Event) => {
	const target = e.target as HTMLInputElement
	const files = target.files
	fileError.value = null

	if (files) {
		const file = files[0]
		const fileType = file.type

		if (!fileType.includes('json')) {
			fileError.value = 'Invalid file. Please load a JSON file.'
		}

		jsonName.value = file.name

		loading.value = true
		worker.postMessage(file)
	}
}

const loadMoreData = () => {
	const scrollY = window.scrollY
	const windowHeight = window.innerHeight
	const documentHeight = document.documentElement.scrollHeight

	if (scrollY + windowHeight >= documentHeight - 200) {
		dataLoaded.value += 5
	}
}

onMounted(() => {
	window.addEventListener('scroll', loadMoreData)
})

worker.onmessage = (msg) => {
	if (msg.data === 'error') {
		fileError.value = 'Invalid file. Please load a JSON file.'
	} else {
		jsonData.value = msg.data
	}
	loading.value = false
}
</script>

<template>
	<div v-if="!jsonData">
		<h1>JSON Tree Viewer</h1>
		<p>Simple JSON Viewer that runs completely on-client. No data exchange</p>
		<input type="file" @change="handleFile" />
		<p v-if="fileError">{{ fileError }}</p>
		<p v-if="loading">Loading...</p>
	</div>
	<div v-else>
		<JsonRenderer
			:json="
				Array.isArray(jsonData) ? jsonData.slice(0, dataLoaded) : jsonData
			"
			:jsonName="jsonName"
			:dataLoaded="dataLoaded"
		/>
	</div>
</template>
