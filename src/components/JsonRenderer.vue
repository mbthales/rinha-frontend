<script setup lang="ts">
import { handleClassForIndex } from '../utils/functions'

defineProps({
	data: Object,
	jsonName: String,
	dataLoaded: Number,
})
</script>

<template>
	<div>
		<h1 class="text-[32px] mb-[10px] mt-6 font-bold" v-if="jsonName">
			{{ jsonName }}
		</h1>
		<ul class="font-semibold font-inter">
			<li
				v-if="!(data instanceof Array) && typeof data === 'object'"
				v-for="(value, key) in data"
				class="mb-2"
			>
				<span v-if="value === null"
					><span :class="handleClassForIndex(key)">{{ key }}</span
					>: null</span
				>
				<span v-else-if="typeof value === 'object' && !Array.isArray(value)"
					><span :class="handleClassForIndex(key)">{{ key }}</span
					>:
					<JsonRenderer
						:data="value"
						class="border-l-[1px] pl-6 pt-1 border-gray"
					/>
				</span>
				<span v-else-if="Array.isArray(value)">
					<span :class="handleClassForIndex(key)">{{ key }}</span
					>:
					<span class="text-brown ml-2">[</span>
					<JsonRenderer
						:data="value.slice(0, dataLoaded)"
						class="border-l-[1px] pl-6 border-gray"
					/>
					<span class="text-brown ml-2">]</span>
				</span>
				<span v-else-if="typeof value === 'string'">
					<span :class="handleClassForIndex(key)">{{ key }}</span
					>: "{{ value }}"
				</span>
				<span
					v-else-if="
						typeof value === 'number' || typeof value === 'boolean'
					"
				>
					<span :class="handleClassForIndex(key)">{{ key }}</span
					>: {{ value }}
				</span>
			</li>
			<li
				v-else-if="data instanceof Array"
				v-for="(item, index) in data.slice(0, dataLoaded)"
				class="my-1"
			>
				<span class="text-gray mt-2">{{ index }}: </span>
				<span v-if="!Array.isArray(item) && typeof item != 'object'">{{
					typeof item === 'string' ? `"${item}"` : item
				}}</span>
				<JsonRenderer
					v-else
					:data="item"
					class="border-l-[1px] pl-6 border-gray"
				/>
			</li>
		</ul>
	</div>
</template>
