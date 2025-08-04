import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PaginationProps } from '@/types'

export default function Pagination({
	currentPage,
	totalItems,
	itemsPerPage,
	onPageChange,
}: PaginationProps) {
	const totalPages = Math.ceil(totalItems / itemsPerPage)

	if (totalPages <= 1) {
		return null
	}

	const getVisiblePages = () => {
		const delta = 2
		const range = []
		const rangeWithDots = []

		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i)
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, '...')
		} else {
			rangeWithDots.push(1)
		}

		rangeWithDots.push(...range)

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push('...', totalPages)
		} else {
			rangeWithDots.push(totalPages)
		}

		return rangeWithDots
	}

	const visiblePages = getVisiblePages()

	return (
		<div className="flex items-center justify-center space-x-2 mt-8">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="flex items-center justify-center w-8 h-8 cursor-pointer rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			>
				<ChevronLeft className="h-4 w-4" />
			</button>

			{visiblePages.map((page, index) => (
				<button
					key={index}
					onClick={() => typeof page === 'number' && onPageChange(page)}
					disabled={page === '...'}
					className={`flex items-center cursor-pointer justify-center w-8 h-8 rounded-md border transition-colors ${
						page === currentPage
							? 'border-green-600 bg-green-600 text-white'
							: page === '...'
							? 'border-transparent bg-transparent text-gray-400 cursor-default'
							: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
					}`}
				>
					{page}
				</button>
			))}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="flex items-center cursor-pointer justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			>
				<ChevronRight className="h-4 w-4" />
			</button>
		</div>
	)
}
