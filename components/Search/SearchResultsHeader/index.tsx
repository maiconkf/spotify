import { X } from 'lucide-react'
import { SearchResultsHeaderProps } from '@/types'

const SearchResultsHeader = ({
	searchQuery,
	onClearSearch,
}: SearchResultsHeaderProps) => {
	return (
		<div className="flex items-center justify-between mb-6">
			<h2 className="text-2xl font-bold text-gray-900">
				Resultados para &quot;{searchQuery}&quot;
			</h2>
			<button
				onClick={onClearSearch}
				className="cursor-pointer flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1 rounded-md transition-colors"
			>
				<X className="h-4 w-4" />
				Limpar pesquisa
			</button>
		</div>
	)
}

export default SearchResultsHeader
