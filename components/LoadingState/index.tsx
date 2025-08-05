import { LoadingStateProps } from '@/types'
import { useTranslations } from '@/hooks/useTranslations'

export default function LoadingState({ searchType }: LoadingStateProps) {
	const { t } = useTranslations()

	const typeText =
		searchType === 'artist' ? t('loading.artists') : t('loading.albums')

	return (
		<div className="text-center py-8">
			<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
			<p className="mt-2 text-gray-600">
				{t('loading.searching', { type: typeText })}
			</p>
		</div>
	)
}
