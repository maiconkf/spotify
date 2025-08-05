import { ChevronDown } from 'lucide-react'
import { ShowMoreButtonProps } from '@/types/components'
import { useI18n } from '@/contexts/I18nContext'

export default function ShowMoreButton({
	showAll,
	onToggle,
	hasMoreTracks,
}: ShowMoreButtonProps) {
	const { t } = useI18n()

	if (!hasMoreTracks) return null

	return (
		<div className="mt-4 text-center">
			<button
				onClick={onToggle}
				className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
			>
				{showAll ? t('artist.showLess') : t('artist.showMore')}
				<ChevronDown
					className={`h-4 w-4 transition-transform duration-200 ${
						showAll ? 'rotate-180' : ''
					}`}
				/>
			</button>
		</div>
	)
}
