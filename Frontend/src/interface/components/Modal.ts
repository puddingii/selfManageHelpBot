export interface Modal {
	title: string
	fields: ModalField | ModalRequiredField
	buttons: ModalButtons
}

interface ModalButtons {
	submit: DefaultModalBtn
	reset: DefaultModalBtn
	customs?: Array<CustomModalBtn>
	position?: string
	// 위치 submit reset | customs 이런식으로
	// | submit reset customs
	// submit | customs reset
	// 이게될까...?
}

interface DefaultModalBtn {
	use: boolean
	text?: string
	className?: string
}

interface CustomModalBtn {
	text: string
	handleClick: (event?: React.MouseEvent<HTMLButtonElement>) => void
	className?: string
}

type ModalRequiredField = ModalField & {
	required: true
	errorMessage: string
}

type ModalField = ModalInputType &
	Readonly<{
		label: string
		name: string
		placeholder?: string
		readonly?: boolean
		pattern?: string
		validate?: (value: Pick<ModalInputType, 'type'>) => boolean
	}>

type ModalInputType = ModalInputSelect | ModalInputCheckbox | ModalInputText

interface ModalInputSelect {
	type: 'select'
	options: ModalInputSelectOptions
}

type ModalInputSelectOptions = {
	text: string
	value: string | number
}

interface ModalInputCheckbox {
	type: 'checkbox'
	value: boolean
}

interface ModalInputText {
	type: 'text' | 'password'
	value: string
}
