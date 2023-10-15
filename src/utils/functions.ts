export const handleClassForIndex = (index: string | number) => {
	if (typeof index === 'string') {
		return 'text-blue'
	} else if (typeof index === 'number') {
		return 'text-gray'
	}
}

export const isJson = (item: string) => {
	try {
		const test = JSON.parse(item)
		return test
	} catch (e) {
		return false
	}
}
