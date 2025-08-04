import { forwardRef } from 'react'
import AlbumCard from '@/components/Album/Card'
import Pagination from '@/components/Pagination'
import SearchResultsHeader from '@/components/Search/SearchResultsHeader'
import ResultsCounter from '@/components/Search/ResultsCounter'
import { AlbumResultsProps } from '@/types'

const AlbumResults = forwardRef<HTMLDivElement, AlbumResultsProps>(
	(
		{ searchQuery, albumsData, currentPage, onPageChange, onClearSearch },
		ref
	) => {
		if (!albumsData || albumsData.albums.items.length === 0) {
			return null
		}

		return (
			<>
				<SearchResultsHeader
					searchQuery={searchQuery}
					onClearSearch={onClearSearch}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{albumsData.albums.items.map(album => (
						<AlbumCard key={album.id} album={album} />
					))}
				</div>

				<div className="mt-6" ref={ref}>
					<ResultsCounter
						offset={albumsData.albums.offset}
						itemsLength={albumsData.albums.items.length}
						total={albumsData.albums.total}
						itemType="álbuns"
					/>

					<Pagination
						currentPage={currentPage}
						totalItems={albumsData.albums.total}
						itemsPerPage={albumsData.albums.limit}
						onPageChange={onPageChange}
					/>
				</div>
			</>
		)
	}
)

AlbumResults.displayName = 'AlbumResults'

export default AlbumResults
