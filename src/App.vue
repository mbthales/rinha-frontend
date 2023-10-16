<script setup lang="ts">
import { ref, onMounted } from 'vue'

import {
	handleLoadMoreData,
	handleWorkerMessage,
	handleUploadedFile,
} from './utils/functions'

import JsonRenderer from './components/JsonRenderer.vue'

const workerUrl = new URL('./workers/fileReader.ts', import.meta.url)
const worker = new Worker(workerUrl, {
	type: 'module',
})

const jsonData = ref<Array<Object> | Object | null>(null)
const jsonName = ref('')
const fileError = ref('')
const loading = ref(false)
const dataLoaded = ref(1)

const handleFile = (e: Event) => {
	handleUploadedFile({ worker, e, fileError, jsonName, loading })
}

onMounted(() => {
	handleLoadMoreData(worker)
})

worker.onmessage = (msg) => {
	handleWorkerMessage({ msg, fileError, jsonData, loading })
}
</script>

<template>
	<main>
		<div
			class="flex h-full w-full items-center justify-center"
			id="teste"
			v-if="!jsonData"
			tabindex="1"
		>
			<div class="text-center" tabindex="1">
				<h1 class="text-5xl font-bold" tabindex="1">JSON Tree Viewer</h1>
				<p class="my-6 text-2xl font-normal" tabindex="1">
					Simple JSON Viewer that runs completely on-client. No data
					exchange
				</p>
				<input
					class="invisible absolute"
					id="files"
					type="file"
					@change="handleFile"
				/>
				<label
					class="gradient-button mx-auto block w-[130px] cursor-pointer gap-[10px] rounded border-[1px] px-[12px] py-[6px] text-base font-medium opacity-[70%] hover:opacity-[60%]"
					for="files"
					tabindex="1"
					aria-label="Input to load JSON file"
					>Load JSON</label
				>
				<p class="mt-6 text-red" v-if="fileError.length">{{ fileError }}</p>
				<p class="mt-6" v-if="loading">Loading...</p>
			</div>
		</div>
		<div class="mx-auto w-[638px] bg-white" v-else>
			<JsonRenderer
				:data="jsonData"
				:jsonName="jsonName"
				:dataLoaded="dataLoaded"
			/>
		</div>
	</main>
</template>
