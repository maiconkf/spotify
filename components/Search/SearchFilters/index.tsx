import { Users, Disc } from 'lucide-react'
import { SearchFiltersProps } from '@/types'
import { useI18n } from '@/contexts/I18nContext'

export default function SearchFilters({
	searchType,
	onFilterChange,
}: SearchFiltersProps) {
	const { t } = useI18n()

	return (
		<div className="flex justify-center mt-4">
			<div className="flex bg-gray-100 rounded-lg p-1">
				<button
					onClick={() => onFilterChange('artist')}
					className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
						searchType === 'artist'
							? 'bg-white text-gray-900 shadow-sm'
							: 'text-gray-600 hover:text-gray-900'
					}`}
				>
					<Users className="h-4 w-4" />
					{t('filters.artists')}
				</button>
				<button
					onClick={() => onFilterChange('album')}
					className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm cursor-pointer font-medium transition-colors ${
						searchType === 'album'
							? 'bg-white text-gray-900 shadow-sm'
							: 'text-gray-600 hover:text-gray-900'
					}`}
				>
					<Disc className="h-4 w-4" />
					{t('filters.albums')}
				</button>
			</div>
		</div>
	)
}
