namespace ifStore {
	// Table Box Component
	export namespace AccountBookAjax {
		export type AccountInfo = import('./store/accountBook').accountBookInfo
		export type CreateNewAccountInfo = import('./store/accountBook').createAccountBook
	}
}

export type { ifStore }
