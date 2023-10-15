<script setup lang="ts">
import { handleClassForProperty } from '../utils/functions'

defineProps({
	property: [String, Number],
})
</script>

<template>
	<span :class="handleClassForProperty(property!)">{{ property }}</span
	>:
</template>
