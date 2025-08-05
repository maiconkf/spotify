'use client'

import { useParams } from 'next/navigation'
import { useArtistPage } from '@/hooks/useArtistPage'
import {
	ArtistLoadingSpinner,
	ArtistErrorState,
} from '@/components/Artist/LoadingState'
import ArtistHeader from '@/components/Artist/Header'
import ArtistProfile from '@/components/Artist/Profile'
import ArtistTopTracks from '@/components/Artist/TopTracks'
import ArtistAlbumsSection from '@/components/Artist/AlbumsSection'

function ArtistPageContent() {
	const params = useParams()
	const artistId = params.id as string

	const {
		artistData,
		albumsData,
		currentPage,
		isArtistLoading,
		isAlbumsLoading,
		artistError,
		albumsError,
		handleBack,
		handlePageChange,
		openSpotifyLink,
		goHome,
	} = useArtistPage(artistId)

	if (!artistData && isArtistLoading) {
		return <ArtistLoadingSpinner />
	}

	if (!artistData && !isArtistLoading) {
		return <ArtistErrorState error={artistError} onGoHome={goHome} />
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<ArtistHeader onBack={handleBack} />

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
				{artistData && (
					<ArtistProfile artist={artistData} onOpenSpotify={openSpotifyLink} />
				)}

				{artistData && (
					<div className="my-8">
						<ArtistTopTracks artistId={artistId} />
					</div>
				)}

				{artistData && (
					<ArtistAlbumsSection
						albumsData={albumsData}
						currentPage={currentPage}
						isLoading={isAlbumsLoading}
						error={albumsError}
						artistName={artistData.name}
						onPageChange={handlePageChange}
					/>
				)}
			</main>
		</div>
	)
}

export default function ArtistPage() {
	return <ArtistPageContent />
}
