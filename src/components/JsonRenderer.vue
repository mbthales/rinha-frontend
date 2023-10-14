<script setup lang="ts">
defineProps({
	json: Object,
	jsonName: String,
	dataLoaded: Number,
})
</script>

<template>
	<div class="ml-4">
		<h1 class="text-6xl mb-2" v-if="jsonName">{{ jsonName }}</h1>
		<ul class="font-semibold font-inter ml-6">
			<li
				v-if="!Array.isArray(json) && typeof json === 'object'"
				v-for="(value, key) in json"
			>
				<span v-if="value === null"
					><span
						:class="{
							'text-blue-300': isNaN(key as unknown as number),
							'text-gray-400': !isNaN(key as unknown as number),
						}"
						>{{ key }}</span
					>: null</span
				>
				<span v-else-if="typeof value === 'object' && !Array.isArray(value)"
					><span
						:class="{
							'text-blue-300': isNaN(key as unknown as number),
							'text-gray-400': !isNaN(key as unknown as number),
						}"
						>{{ key }}</span
					>:
					<JsonRenderer
						:json="value"
						class="border-l-[1px] border-[#BFBFBF]"
					/>
				</span>
				<span v-else-if="Array.isArray(value)">
					<span
						:class="{
							'text-blue-300': isNaN(key as unknown as number),
							'text-gray-400': !isNaN(key as unknown as number),
						}"
						>{{ key }}</span
					>:
					<span class="text-[#F2CAB8] ml-2">[</span>
					<JsonRenderer
						:json="value.slice(0, dataLoaded)"
						class="border-l-[1px] border-[#BFBFBF]"
					/>
					<span class="text-[#F2CAB8] ml-2">]</span>
				</span>
				<span v-else-if="typeof value === 'string'">
					<span
						:class="{
							'text-blue-300': isNaN(key as unknown as number),
							'text-gray-400': !isNaN(key as unknown as number),
						}"
						>{{ key }}</span
					>: "{{ value }}"
				</span>
				<span
					v-else-if="
						typeof value === 'number' || typeof value === 'boolean'
					"
				>
					<span
						:class="{
							'text-blue-300': isNaN(key as unknown as number),
							'text-gray-400': !isNaN(key as unknown as number),
						}"
						>{{ key }}</span
					>: {{ value }}
				</span>
			</li>
			<li
				v-else-if="Array.isArray(json)"
				v-for="(item, index) in json.slice(0, dataLoaded)"
			>
				<span class="text-gray-400">{{ index }}: </span>
				<span v-if="!Array.isArray(item) && typeof item != 'object'">{{
					item
				}}</span>
				<JsonRenderer
					v-else
					:json="item"
					class="border-l-[1px] border-[#BFBFBF]"
				/>
			</li>
		</ul>
	</div>
</template>
