'use client'

import AlbumsList from '@/components/Album/List'
import Pagination from '@/components/Pagination'
import { AlbumsLoadingSpinner, AlbumsErrorState } from '../LoadingState'
import { ArtistAlbumsSectionProps } from '@/types'
import { useTranslations } from '@/hooks/useTranslations'

export default function ArtistAlbumsSection({
	artistName,
	albumsData,
	isLoading,
	error,
	currentPage,
	onPageChange,
}: ArtistAlbumsSectionProps) {
	const { t } = useTranslations()

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
				{t('artist.albums')} de {artistName}
			</h3>
			<AlbumsList albums={albumsData.items} />

			{albumsData.total > 20 && (
				<div className="mt-8">
					<div className="text-center mb-4">
						<p className="text-gray-600">
							{t('pagination.showing', {
								start: albumsData.offset + 1,
								end: Math.min(
									albumsData.offset + albumsData.items.length,
									albumsData.total
								),
								total: albumsData.total,
								type: t('results.albums'),
							})}
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
