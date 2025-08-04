import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { UseUrlInitializationProps } from '@/types'

export const useUrlInitialization = ({
	handleSearch,
	handlePageChange,
	handleTypeChange,
}: UseUrlInitializationProps) => {
	const searchParams = useSearchParams()
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

			if (page && !isNaN(parseInt(page))) {
				const pageNum = parseInt(page)

				if (pageNum > 1) {
					handlePageChange(pageNum)
				}
			}

			handleSearch(decodeURIComponent(query))
		}

		setIsInitialized(true)
	}, [
		searchParams,
		handleSearch,
		handlePageChange,
		handleTypeChange,
		isInitialized,
	])

	return { isInitialized }
}
