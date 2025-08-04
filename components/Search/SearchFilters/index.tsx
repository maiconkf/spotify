import { Users, Disc } from 'lucide-react'
import { SearchFiltersProps } from '@/types'

export default function SearchFilters({
	searchType,
	onFilterChange,
}: SearchFiltersProps) {
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
					Artistas
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
					Álbuns
				</button>
			</div>
		</div>
	)
}
