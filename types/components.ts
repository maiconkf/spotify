import { ReactNode } from 'react'
import { SearchType, PaginationData, SearchResultsData } from './common'
import {
	SpotifyArtist,
	SpotifyAlbum,
	SpotifySearchResponse,
	SpotifyAlbumSearchResponse,
	SpotifyTrack,
} from './spotify'

export interface ProvidersProps {
	children: ReactNode
}

export interface AppStateProviderProps {
	children: ReactNode
}

export interface ArtistProviderProps {
	children: ReactNode
}

export interface AppHeaderProps {
	children: React.ReactNode
}

export interface SearchFormProps {
	onSearch: (query: string) => void
	isLoading?: boolean
	placeholder?: string
	initialValue?: string
}

export interface LoadingStateProps {
	searchType: SearchType
}

export interface ErrorStateProps {
	searchType: SearchType
}

export interface EmptyStateProps {
	searchType?: SearchType
	type: 'no-results' | 'welcome'
}

export interface SearchFiltersProps {
	searchType: SearchType
	onFilterChange: (type: SearchType) => void
}

export interface SearchResultsHeaderProps {
	searchQuery: string
	onClearSearch: () => void
}

export interface ResultsCounterProps {
	offset: number
	itemsLength: number
	total: number
	itemType: 'álbuns' | 'artistas'
}

export interface ArtistResultsProps extends SearchResultsData {
	artistsData: SpotifySearchResponse
}

export interface AlbumResultsProps extends SearchResultsData {
	albumsData: SpotifyAlbumSearchResponse
}

export type PaginationProps = PaginationData

export interface ArtistCardProps {
	artist: SpotifyArtist
}

export interface AlbumCardProps {
	album: SpotifyAlbum
}

export interface ArtistProfileProps {
	artist: SpotifyArtist
	onOpenSpotify: (url: string) => void
}

export interface ArtistHeaderProps {
	onBack: () => void
}

export interface ArtistAlbumsSectionProps {
	artistName?: string
	albumsData?: AlbumsData
	isLoading: boolean
	error?: Error | null
	currentPage: number
	onPageChange: (page: number) => void
}

export interface AlbumsData {
	items: SpotifyAlbum[]
	total: number
	offset: number
}

export interface AlbumsListProps {
	artist: SpotifyArtist
}

export interface SimpleAlbumsListProps {
	albums: SpotifyAlbum[]
	isLoading?: boolean
}

export interface ArtistErrorStateProps {
	error?: Error | null
	onGoHome: () => void
}

export interface ArtistTopTracksProps {
	artistId: string
}

export interface TrackItemProps {
	track: SpotifyTrack
	index: number
}

export interface ShowMoreButtonProps {
	showAll: boolean
	onToggle: () => void
	hasMoreTracks: boolean
}

export interface TopTracksEmptyStateProps {
	message: string
	isError?: boolean
}
