import { ResultsCounterProps } from '@/types'

const ResultsCounter = ({
	offset,
	itemsLength,
	total,
	itemType,
}: ResultsCounterProps) => {
	return (
		<div className="text-center mb-4">
			<p className="text-gray-600">
				Mostrando {offset + 1} - {Math.min(offset + itemsLength, total)} de{' '}
				{total} {itemType}
			</p>
		</div>
	)
}

export default ResultsCounter
