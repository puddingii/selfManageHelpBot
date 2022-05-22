namespace ifStore {
	// Table Box Component
	export namespace AccountBookAjax {
		export type AccountList = import('./store/accountBook').AccountList[]
		export type AccountInfo = import('./store/accountBook').accountBookInfo
	}
}

export type { ifStore }
