<script setup lang="ts">
import {
	isNotObject,
	isArray,
	isObject,
	isNull,
	formatPropertyValue,
} from '../utils/functions'

import JsonNameRenderer from './JsonNameRenderer.vue'
import PropertyRenderer from './PropertyRenderer.vue'
import StringNumBooleanRenderer from './StringNumBooleanRenderer.vue'

defineProps({
	data: Object,
	jsonName: String,
	dataLoaded: Number,
})
</script>

<template>
	<div>
		<JsonNameRenderer :name="jsonName" />
		<ul class="font-inter font-semibold">
			<li
				class="mb-2"
				v-if="isObject(data)"
				v-for="(value, key) in data"
				tabindex="1"
			>
				<span v-if="isNull(value)">
					<PropertyRenderer :property="key" />
					null</span
				>
				<span v-else-if="isObject(value)">
					<PropertyRenderer :property="key" />
					<JsonRenderer
						class="border-l-[1px] border-gray pl-6 pt-1"
						:data="value"
						aria-hidden="true"
					/>
				</span>
				<span v-else-if="isArray(value)">
					<PropertyRenderer :property="key" />
					<span class="ml-2 text-brown">[</span>
					<JsonRenderer
						class="border-l-[1px] border-gray pl-6"
						:data="value"
						aria-hidden="true"
					/>
					<span class="ml-2 text-brown">]</span>
				</span>
				<StringNumBooleanRenderer v-else :property="key" :pValue="value" />
			</li>
			<li
				class="my-1"
				v-else-if="isArray(data)"
				v-for="(item, index) in data"
				tabindex="1"
			>
				<PropertyRenderer :property="index" />
				<span v-if="isNotObject(item)"
					>{{ formatPropertyValue(item) }}
				</span>
				<JsonRenderer
					class="border-l-[1px] border-gray pl-6"
					v-else
					:data="item"
					aria-hidden="true"
				/>
			</li>
		</ul>
	</div>
</template>
