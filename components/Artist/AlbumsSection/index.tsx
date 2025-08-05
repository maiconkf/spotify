'use client'

import AlbumsList from '@/components/Album/List'
import Pagination from '@/components/Pagination'
import { AlbumsLoadingSpinner, AlbumsErrorState } from '../LoadingState'
import { ArtistAlbumsSectionProps } from '@/types'

export default function ArtistAlbumsSection({
	artistName,
	albumsData,
	isLoading,
	error,
	currentPage,
	onPageChange,
}: ArtistAlbumsSectionProps) {
	if (isLoading) {
		return <AlbumsLoadingSpinner />
	}

	if (error) {
		return <AlbumsErrorState />
	}

	if (!albumsData) {
		return null
	}

	return (
		<div id="albums-section">
			<h3 className="text-2xl font-bold text-gray-900 mb-6">
				Álbuns de {artistName}
			</h3>
			<AlbumsList albums={albumsData.items} />

			{albumsData.total > 20 && (
				<div className="mt-8">
					<div className="text-center mb-4">
						<p className="text-gray-600">
							Mostrando {albumsData.offset + 1} -{' '}
							{Math.min(
								albumsData.offset + albumsData.items.length,
								albumsData.total
							)}{' '}
							de {albumsData.total} álbuns
						</p>
					</div>
					<Pagination
						currentPage={currentPage}
						totalItems={albumsData.total}
						itemsPerPage={20}
						onPageChange={onPageChange}
					/>
				</div>
			)}
		</div>
	)
}
