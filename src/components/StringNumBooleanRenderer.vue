<script setup lang="ts">
import {
	isString,
	isNumberOrBoolean,
	isNotObject,
	formatPropertyValue,
} from '../utils/functions'

import JsonPropertyRenderer from './PropertyRenderer.vue'

defineProps({
	property: [String],
	pValue: [String, Number, Boolean],
})
</script>

<template>
	<span v-if="isString(pValue) || isNumberOrBoolean(pValue)">
		<JsonPropertyRenderer :property="property" />
		{{ formatPropertyValue(pValue) }}
	</span>
	<span v-else-if="isNotObject(pValue)">
		<JsonPropertyRenderer :property="property" />
		{{ formatPropertyValue(pValue) }}
	</span>
</template>
