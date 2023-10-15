<script setup lang="ts">
defineProps({
	name: String,
})
</script>

<template>
	<h1 class="mb-[10px] mt-6 text-[32px] font-bold" v-if="name" tabindex="1">
		{{ name }}
	</h1>
</template>
