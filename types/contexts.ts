import { SpotifyArtist } from './spotify'
import { SearchType } from './common'

export interface AppState {
	artists: Record<string, SpotifyArtist>
	ui: {
		isLoading: boolean
		searchQuery: string
		currentPage: number
		searchType: SearchType
		lastError: string | null
	}
}

export type AppAction =
	| { type: 'SET_ARTIST'; payload: { id: string; artist: SpotifyArtist } }
	| { type: 'CLEAR_ARTISTS' }
	| { type: 'SET_LOADING'; payload: { isLoading: boolean } }
	| { type: 'SET_SEARCH_QUERY'; payload: { query: string } }
	| { type: 'SET_CURRENT_PAGE'; payload: { page: number } }
	| { type: 'SET_SEARCH_TYPE'; payload: { type: SearchType } }
	| { type: 'SET_ERROR'; payload: { error: string | null } }

export interface AppContextType {
	state: AppState
	dispatch: React.Dispatch<AppAction>
	actions: {
		setArtist: (id: string, artist: SpotifyArtist) => void
		getArtist: (id: string) => SpotifyArtist | undefined
		clearArtists: () => void
		setLoading: (isLoading: boolean) => void
		setSearchQuery: (query: string) => void
		setCurrentPage: (page: number) => void
		setSearchType: (type: SearchType) => void
		setError: (error: string | null) => void
	}
}
