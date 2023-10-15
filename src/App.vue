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
		console.time('JsonRenderer')
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
		console.timeEnd('JsonRenderer')
	}
	loading.value = false
}
</script>

<template>
	<div v-if="!jsonData" class="flex justify-center items-center w-full h-full">
		<div class="text-center">
			<h1 class="text-5xl font-bold">JSON Tree Viewer</h1>
			<p class="font-normal my-6 text-2xl">
				Simple JSON Viewer that runs completely on-client. No data exchange
			</p>
			<input
				type="file"
				id="files"
				class="invisible absolute"
				@change="handleFile"
			/>
			<label
				for="files"
				class="cursor-pointer rounded border-[1px] w-[130px] gap-[10px] gradient-button opacity-[70%] block mx-auto text-base py-[6px] px-[12px] font-medium hover:opacity-[60%]"
				>Load JSON</label
			>
			<p v-if="fileError" class="text-red mt-6">{{ fileError }}</p>
			<p v-if="loading" class="mt-6">Loading...</p>
		</div>
	</div>
	<div v-else>
		<JsonRenderer
			:data="
				jsonData instanceof Array ? jsonData.slice(0, dataLoaded) : jsonData
			"
			:jsonName="jsonName"
			:dataLoaded="dataLoaded"
			class="mx-auto w-[638px]"
		/>
	</div>
</template>
