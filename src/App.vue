<script setup lang="ts">
import JsonRenderer from './components/JsonRenderer.vue'
import { ref } from 'vue'

const fileError = ref<String | null>(null)
const jsonName = ref('')
const jsonData = ref<Object | null>(null)

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

		readJsonFile(file)
	}
}

const readJsonFile = (file: File) => {
	const reader = new FileReader()

	reader.onload = (evt: ProgressEvent<FileReader>) => {
		const readerResult = evt.target?.result as string
		jsonData.value = JSON.parse(readerResult)
	}

	reader.readAsText(file)
}
</script>

<template>
	<div v-if="!jsonData">
		<h1>JSON Tree Viewer</h1>
		<p>Simple JSON Viewer that runs completely on-client. No data exchange</p>
		<input type="file" @change="handleFile" />
		<p v-if="fileError">{{ fileError }}</p>
	</div>
	<div v-else>
		<JsonRenderer :json="jsonData" :jsonName="jsonName" />
	</div>
</template>
