import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAppState } from '@/contexts/AppStateContext'

export const useUrlInitialization = ({
	handleTypeChange,
}: {
	handleTypeChange: (type: 'artist' | 'album') => void
}) => {
	const searchParams = useSearchParams()
	const { actions } = useAppState()
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() => {
		if (isInitialized) return

		const query = searchParams.get('q')
		const page = searchParams.get('page')
		const type = searchParams.get('type')

		if (query) {
			if (type === 'artist' || type === 'album') {
				handleTypeChange(type)
			}

			actions.setSearchQuery(decodeURIComponent(query))
			actions.setError(null)

			if (page && !isNaN(parseInt(page))) {
				const pageNum = parseInt(page)
				actions.setCurrentPage(pageNum)
			} else {
				actions.setCurrentPage(1)
			}
		}

		setIsInitialized(true)
	}, [searchParams, actions, handleTypeChange, isInitialized])

	return { isInitialized }
}
