import { ResultsCounterProps } from '@/types'
import { useI18n } from '@/contexts/I18nContext'

const ResultsCounter = ({
	offset,
	itemsLength,
	total,
	itemType,
}: ResultsCounterProps) => {
	const { t } = useI18n()

	const typeText =
		itemType === 'artists' ? t('results.artists') : t('results.albums')

	return (
		<div className="text-center mb-4">
			<p className="text-gray-600">
				{t('pagination.showing', {
					start: offset + 1,
					end: Math.min(offset + itemsLength, total),
					total,
					type: typeText,
				})}
			</p>
		</div>
	)
}

export default ResultsCounter
