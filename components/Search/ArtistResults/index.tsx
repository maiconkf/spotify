import { forwardRef } from 'react'
import ArtistCard from '@/components/Artist/Card'
import Pagination from '@/components/Pagination'
import SearchResultsHeader from '@/components/Search/SearchResultsHeader'
import ResultsCounter from '@/components/Search/ResultsCounter'
import { ArtistResultsProps } from '@/types'

const ArtistResults = forwardRef<HTMLDivElement, ArtistResultsProps>(
	(
		{ searchQuery, artistsData, currentPage, onPageChange, onClearSearch },
		ref
	) => {
		if (!artistsData || artistsData.artists.items.length === 0) {
			return null
		}

		return (
			<>
				<SearchResultsHeader
					searchQuery={searchQuery}
					onClearSearch={onClearSearch}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{artistsData.artists.items.map(artist => (
						<ArtistCard key={artist.id} artist={artist} />
					))}
				</div>

				<div className="mt-6" ref={ref}>
					<ResultsCounter
						offset={artistsData.artists.offset}
						itemsLength={artistsData.artists.items.length}
						total={artistsData.artists.total}
						itemType="artists"
					/>

					<Pagination
						currentPage={currentPage}
						totalItems={artistsData.artists.total}
						itemsPerPage={artistsData.artists.limit}
						onPageChange={onPageChange}
					/>
				</div>
			</>
		)
	}
)

ArtistResults.displayName = 'ArtistResults'

export default ArtistResults
