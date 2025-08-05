import { X } from 'lucide-react'
import { SearchResultsHeaderProps } from '@/types'
import { useTranslations } from '@/hooks/useTranslations'

const SearchResultsHeader = ({
	searchQuery,
	onClearSearch,
}: SearchResultsHeaderProps) => {
	const { t } = useTranslations()

	return (
		<div className="flex items-center justify-between mb-6">
			<h2 className="text-lg font-semibold text-gray-900">
				{t('search.results', { query: searchQuery })}
			</h2>
			<button
				onClick={onClearSearch}
				className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
			>
				<X className="h-4 w-4" />
				{t('search.clear')}
			</button>
		</div>
	)
}

export default SearchResultsHeader
