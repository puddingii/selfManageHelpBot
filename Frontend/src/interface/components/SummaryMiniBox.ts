interface iconOption {
	type: string
	class: string
	name: string
	value: any
	onClick: Function
}

export interface ComponentOptions {
	title: string
	value: string
	mainIconOption: iconOption
	subIconOption: iconOption
}
