export interface accountBookInfo {
	userId: string
	amount: number
	isFixed: boolean
	category: string
	content: string
	date: string
}

export interface AccountList extends accountBookInfo {
	accountId: string
}
