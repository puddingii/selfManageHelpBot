import Swal from 'sweetalert2'

const isAuthenticated = () => {
	if (localStorage.getItem('userId')) {
		return true
	}
	return false
}

const getLoginId = () => {
	return localStorage.getItem('userId') ?? ''
}

const logout = () => {
	Swal.fire({
		title: 'Are you sure?',
		text: 'Logout',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
	}).then(result => {
		if (result.isConfirmed) {
			Swal.fire({
				icon: 'success',
				title: 'Logged out.',
				showConfirmButton: false,
				timer: 1000,
			}).then(result => {
				localStorage.removeItem('userId')
				location.reload()
			})
		}
	})
}

export { isAuthenticated, getLoginId, logout }
