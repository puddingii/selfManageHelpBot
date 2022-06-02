export const setComma = num => {
	if (typeof num === 'number') {
		num = num.toString()
	}
	return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}
