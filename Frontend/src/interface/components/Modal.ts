/**
 * title: modal header에 들어갈 타이틀
 * fields: modal body에 들어갈 input 설정들
 * buttons: modal footer에 들어갈 button들, reset과 submit은 기본으로 들어감
 * fieldValues: 모달을 열 때 input에 초기화 해줄 값들, {name: value,...} 형태임
 * 							fields의 value보다 우선순위가 높음
 */
export interface Modal {
	title: string
	fields: Array<ModalField | ModalRequiredField>
	hiddenFields: Array<ModalHiddenField>
	buttons: ModalButtons
	fieldValues: Record<string, string>
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
	callback?: (param?: any) => boolean // true => close modal
	text?: string
	className?: string
}

interface CustomModalBtn {
	text: string
	handleClick: (event?: React.MouseEvent<HTMLButtonElement>) => void
	callback?: (param?: any) => boolean // true => close modal
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
		id?: string
		disabled?: boolean
	}>

type ModalInputType = ModalInputSelect | ModalInputCheckbox | ModalInputText

interface ModalInputSelect {
	type: 'select'
	value: string | number
	options: Array<ModalInputSelectOptions>
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
	type: 'text' | 'password' | 'date'
	value: string
	placeholder?: string
	readonly?: boolean
	pattern?: string
	validate?: (value: Pick<ModalInputType, 'type'>) => boolean
}

interface ModalHiddenField {
	type: 'text'
	value: string | number
	name: string
}
