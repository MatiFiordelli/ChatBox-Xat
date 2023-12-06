export interface SmileyObject {
	src: string | undefined
	code: string | undefined
}

export interface PropsSmileysCarousel {
	statusProps: {
		smiley: SmileyObject | null | undefined
		setSmiley: React.Dispatch<
			React.SetStateAction<SmileyObject | null | undefined>
		>
		messageInputRef: React.MutableRefObject<HTMLInputElement | null>
	}
}
