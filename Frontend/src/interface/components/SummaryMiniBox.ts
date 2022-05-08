type iconOption = {
	type: string
	color: string
}

export type ComponentOptions = {
	title: string
	value: string
	onBtnClick?: Function
	btnName: string
	mainIconOption: iconOption
	subIconOption: iconOption
}
