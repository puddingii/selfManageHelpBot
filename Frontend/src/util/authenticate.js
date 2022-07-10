const isAuthenticated = () => {
	if (localStorage.getItem('userId')) {
		return true
	}
	return false
}

const getLoginId = () => {
	return localStorage.getItem('userId')
}

export { isAuthenticated, getLoginId }
