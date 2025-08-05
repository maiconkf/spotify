import { Music } from 'lucide-react'
import { EmptyStateProps } from '@/types'
import { useI18n } from '@/contexts/I18nContext'

export default function EmptyState({ searchType, type }: EmptyStateProps) {
	const { t } = useI18n()

	if (type === 'welcome') {
		return (
			<div className="text-center py-8 sm:py-16">
				<Music className="h-20 w-20 text-green-600 mx-auto mb-6" />
				<h2 className="text-2xl font-bold text-gray-900 mb-4">
					{t('empty.welcomeTitle')}
				</h2>
				<p className="text-gray-600 mb-8 max-w-md mx-auto">
					{t('empty.welcomeSubtitle')}
				</p>
			</div>
		)
	}

	if (type === 'no-results') {
		const typeText =
			searchType === 'artist' ? t('empty.artists') : t('empty.albums')

		return (
			<div className="text-center py-12">
				<Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
				<h3 className="text-lg font-semibold text-gray-900 mb-2">
					{t('empty.noResults', { type: typeText })}
				</h3>
				<p className="text-gray-600">{t('empty.subtitle')}</p>
			</div>
		)
	}

	return null
}
