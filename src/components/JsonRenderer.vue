<script setup lang="ts">
defineProps({ json: Object, jsonName: String })
</script>

<template>
	<div class="ml-4">
		<h1 class="text-6xl mb-2" v-if="jsonName">{{ jsonName }}</h1>
		<ul class="font-semibold font-inter ml-6">
			<li v-for="(value, key) in json">
				<span
					:class="{
							'text-[#4E9590]': isNaN((key as unknown) as number),
							'text-[#BFBFBF]': !isNaN((key as unknown) as number),
						}"
					>{{ key }}</span
				>
				<span style="color: #999; font-weight: normal">:</span>
				<span v-if="value === null" class="ml-2">null</span>
				<span v-else-if="typeof value === 'string'" class="ml-2"
					>"{{ value }}"</span
				>
				<span
					v-else-if="typeof value === 'object' && !Array.isArray(value)"
				>
					<json-renderer
						:json="value"
						class="border-l-[1px] border-[#BFBFBF]"
					/>
				</span>
				<span v-else-if="Array.isArray(value)">
					<span class="text-[#F2CAB8] ml-2">[</span>
					<json-renderer
						:json="value"
						class="border-l-[1px] border-[#BFBFBF]"
					/>
					<span class="text-[#F2CAB8] ml-2">]</span>
				</span>
				<span v-else class="ml-2">
					{{ value }}
				</span>
			</li>
		</ul>
	</div>
</template>
