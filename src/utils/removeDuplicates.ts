export const removeDuplicates = (arr: any) => {
	let unique: any = {}
	let result: any = []

	for (let i = 0; i < arr.length; i++) {
		if (!unique[arr[i].title]) {
			unique[arr[i].title] = true
			result.push(arr[i])
		}
	}
	return result
}
