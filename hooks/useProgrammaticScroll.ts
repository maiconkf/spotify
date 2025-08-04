import { useState } from 'react'

export const useProgrammaticScroll = () => {
	const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false)

	const startProgrammaticScroll = () => {
		setIsProgrammaticScroll(true)
		setTimeout(() => {
			setIsProgrammaticScroll(false)
		}, 1000)
	}

	return {
		isProgrammaticScroll,
		startProgrammaticScroll,
	}
}
