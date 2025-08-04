'use client'

import { useEffect, useState, Suspense } from 'react'
import { SpotifyArtist, SearchType } from '@/types'
import SearchForm from '@/components/Form'
import AlbumsList from '@/components/Artist/List'
import AppHeader from '@/components/AppHeader'
import { SearchFilters, ArtistResults, AlbumResults } from '@/components/Search'
import EmptyState from '@/components/EmptyState'
import LoadingState from '@/components/LoadingState'
import ErrorState from '@/components/ErrorState'
import { useNavigation } from '@/hooks/useNavigation'
import { useUrlInitialization } from '@/hooks/useUrlInitialization'
import { useProgrammaticScroll } from '@/hooks/useProgrammaticScroll'
import { usePrefetchObserver } from '@/hooks/usePrefetchObserver'
import {
	useOptimizedSearchAlbums,
	useOptimizedSearchArtists,
	useSearchState,
	useCacheOptimization,
} from '@/hooks/useSpotify'

function SpotifyApp() {
	const [selectedArtist, setSelectedArtist] = useState<SpotifyArtist | null>(
		null
	)

	const { updateURL, goHome } = useNavigation()
	const { isProgrammaticScroll, startProgrammaticScroll } =
		useProgrammaticScroll()

	const {
		searchQuery,
		currentPage,
		searchType,
		handleSearch,
		handlePageChange,
		handleTypeChange,
		prefetchNextPage,
		clearSearch,
	} = useSearchState()

	const { cleanupCache } = useCacheOptimization()

	useUrlInitialization({
		handleSearch,
		handlePageChange,
		handleTypeChange,
	})

	const {
		data: artistsData,
		isLoading: isLoadingArtists,
		error: artistsError,
	} = useOptimizedSearchArtists({
		query: searchQuery,
		page: currentPage,
		enabled: searchType === 'artist',
	})

	const {
		data: albumsData,
		isLoading: isLoadingAlbums,
		error: albumsError,
	} = useOptimizedSearchAlbums({
		query: searchQuery,
		page: currentPage,
		enabled: searchType === 'album',
	})

	const { artistPaginationRef, albumPaginationRef } = usePrefetchObserver({
		searchQuery,
		searchType,
		artistsData,
		albumsData,
		prefetchNextPage,
		isProgrammaticScroll,
	})

	const isLoading = searchType === 'artist' ? isLoadingArtists : isLoadingAlbums
	const error = searchType === 'artist' ? artistsError : albumsError
	const errorMessage = error ? String(error) : null

	const handleSearchWithNavigation = (query: string) => {
		handleSearch(query)
		setSelectedArtist(null)
		updateURL({ query, page: 1, type: searchType })
	}

	const handlePageChangeWithNavigation = (page: number) => {
		startProgrammaticScroll()
		handlePageChange(page)
		setSelectedArtist(null)
		updateURL({ query: searchQuery, page, type: searchType })
	}

	const handleFilterChange = (type: SearchType) => {
		handleTypeChange(type)
		setSelectedArtist(null)
		updateURL({ query: searchQuery, page: 1, type })
	}

	const handleClearSearch = () => {
		clearSearch()
		setSelectedArtist(null)
		goHome()
	}

	useEffect(() => {
		const interval = setInterval(() => {
			cleanupCache()
		}, 30 * 60 * 1000)

		return () => clearInterval(interval)
	}, [cleanupCache])

	return (
		<div className="min-h-screen bg-gray-50">
			<AppHeader>
				<SearchForm
					onSearch={handleSearchWithNavigation}
					isLoading={isLoading}
				/>

				{searchQuery && (
					<SearchFilters
						searchType={searchType}
						onFilterChange={handleFilterChange}
					/>
				)}
			</AppHeader>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{errorMessage && <ErrorState searchType={searchType} />}

				{isLoading && searchQuery && <LoadingState searchType={searchType} />}

				{searchType === 'artist' &&
					artistsData &&
					artistsData.artists.items.length > 0 && (
						<ArtistResults
							searchQuery={searchQuery}
							artistsData={artistsData}
							currentPage={currentPage}
							onPageChange={handlePageChangeWithNavigation}
							onClearSearch={handleClearSearch}
							ref={artistPaginationRef}
						/>
					)}

				{searchType === 'album' &&
					albumsData &&
					albumsData.albums.items.length > 0 && (
						<AlbumResults
							searchQuery={searchQuery}
							albumsData={albumsData}
							currentPage={currentPage}
							onPageChange={handlePageChangeWithNavigation}
							onClearSearch={handleClearSearch}
							ref={albumPaginationRef}
						/>
					)}

				{searchType === 'artist' &&
					artistsData &&
					artistsData.artists.items.length === 0 &&
					searchQuery &&
					!isLoadingArtists && (
						<EmptyState searchType="artist" type="no-results" />
					)}

				{searchType === 'album' &&
					albumsData &&
					albumsData.albums.items.length === 0 &&
					searchQuery &&
					!isLoadingAlbums && (
						<EmptyState searchType="album" type="no-results" />
					)}

				{!searchQuery && <EmptyState type="welcome" />}

				{selectedArtist && <AlbumsList artist={selectedArtist} />}
			</main>
		</div>
	)
}

export default function HomePage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-gray-50 flex items-center justify-center">
					<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
				</div>
			}
		>
			<SpotifyApp />
		</Suspense>
	)
}
