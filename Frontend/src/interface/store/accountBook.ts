interface defaultAccountBookInfo {
	amount: number
	isFixed: boolean
	category: string
	content: string
	date: string
	fixedDuration: string
}

export interface accountBookInfo extends defaultAccountBookInfo {
	accountId: string
}

export interface createAccountBook extends defaultAccountBookInfo {
	userId: string
}
