import { TopTracksEmptyStateProps } from '@/types/components'
import { useTranslations } from '@/hooks/useTranslations'

export default function TopTracksEmptyState({
	message,
	isError = false,
}: TopTracksEmptyStateProps) {
	const { t } = useTranslations()

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<h2 className="text-xl font-bold text-gray-900 mb-4">
				{t('artist.topTracks')}
			</h2>
			<div className="text-center py-8">
				<p className={isError ? 'text-red-600' : 'text-gray-600'}>{message}</p>
			</div>
		</div>
	)
}
