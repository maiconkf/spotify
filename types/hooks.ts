import { SpotifySearchResponse, SpotifyAlbumSearchResponse } from './spotify'
import { SearchType } from './common'

export interface UsePrefetchObserverProps {
	searchQuery: string
	searchType: SearchType
	artistsData: SpotifySearchResponse | undefined
	albumsData: SpotifyAlbumSearchResponse | undefined
	prefetchNextPage: () => void
	isProgrammaticScroll: boolean
}

export interface UseUrlInitializationProps {
	handleSearch: (query: string) => void
	handlePageChange: (page: number) => void
	handleTypeChange: (type: SearchType) => void
}

export interface UpdateURLParams {
	query: string
	page: number
	type: SearchType
}

export interface SearchHookParams {
	query: string
	page?: number
	enabled?: boolean
}

export interface ArtistAlbumsHookParams {
	artistId: string
	page?: number
}
