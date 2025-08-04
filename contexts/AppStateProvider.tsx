'use client'

import { createContext, useContext, useReducer } from 'react'
import {
	AppState,
	AppAction,
	AppContextType,
	AppStateProviderProps,
	SearchType,
	SpotifyArtist,
} from '@/types'

const initialState: AppState = {
	artists: {},
	ui: {
		isLoading: false,
		searchQuery: '',
		currentPage: 1,
		searchType: 'artist',
		lastError: null,
	},
	navigation: {
		previousPage: null,
		breadcrumbs: [],
	},
}

function appReducer(state: AppState, action: AppAction): AppState {
	switch (action.type) {
		case 'SET_ARTIST':
			return {
				...state,
				artists: {
					...state.artists,
					[action.payload.id]: action.payload.artist,
				},
			}

		case 'CLEAR_ARTISTS':
			return {
				...state,
				artists: {},
			}

		case 'SET_LOADING':
			return {
				...state,
				ui: {
					...state.ui,
					isLoading: action.payload.isLoading,
				},
			}

		case 'SET_SEARCH_QUERY':
			return {
				...state,
				ui: {
					...state.ui,
					searchQuery: action.payload.query,
					currentPage: 1,
				},
			}

		case 'SET_CURRENT_PAGE':
			return {
				...state,
				ui: {
					...state.ui,
					currentPage: action.payload.page,
				},
			}

		case 'SET_SEARCH_TYPE':
			return {
				...state,
				ui: {
					...state.ui,
					searchType: action.payload.type,
					currentPage: 1,
				},
			}

		case 'SET_ERROR':
			return {
				...state,
				ui: {
					...state.ui,
					lastError: action.payload.error,
				},
			}

		case 'SET_PREVIOUS_PAGE':
			return {
				...state,
				navigation: {
					...state.navigation,
					previousPage: action.payload.page,
				},
			}

		case 'ADD_BREADCRUMB':
			return {
				...state,
				navigation: {
					...state.navigation,
					breadcrumbs: [
						...state.navigation.breadcrumbs,
						{ label: action.payload.label, path: action.payload.path },
					],
				},
			}

		case 'CLEAR_BREADCRUMBS':
			return {
				...state,
				navigation: {
					...state.navigation,
					breadcrumbs: [],
				},
			}

		default:
			return state
	}
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppStateProvider({ children }: AppStateProviderProps) {
	const [state, dispatch] = useReducer(appReducer, initialState)

	const actions = {
		setArtist: (id: string, artist: SpotifyArtist) =>
			dispatch({ type: 'SET_ARTIST', payload: { id, artist } }),

		getArtist: (id: string) => state.artists[id],

		clearArtists: () => dispatch({ type: 'CLEAR_ARTISTS' }),

		setLoading: (isLoading: boolean) =>
			dispatch({ type: 'SET_LOADING', payload: { isLoading } }),

		setSearchQuery: (query: string) =>
			dispatch({ type: 'SET_SEARCH_QUERY', payload: { query } }),

		setCurrentPage: (page: number) =>
			dispatch({ type: 'SET_CURRENT_PAGE', payload: { page } }),

		setSearchType: (type: SearchType) =>
			dispatch({ type: 'SET_SEARCH_TYPE', payload: { type } }),

		setError: (error: string | null) =>
			dispatch({ type: 'SET_ERROR', payload: { error } }),

		setPreviousPage: (page: string | null) =>
			dispatch({ type: 'SET_PREVIOUS_PAGE', payload: { page } }),

		addBreadcrumb: (label: string, path: string) =>
			dispatch({ type: 'ADD_BREADCRUMB', payload: { label, path } }),

		clearBreadcrumbs: () => dispatch({ type: 'CLEAR_BREADCRUMBS' }),
	}

	const contextValue: AppContextType = {
		state,
		dispatch,
		actions,
	}

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	)
}

export function useAppState() {
	const context = useContext(AppContext)
	if (context === undefined) {
		throw new Error('useAppState must be used within an AppStateProvider')
	}
	return context
}

export function useArtistState() {
	const { state, actions } = useAppState()
	return {
		artists: state.artists,
		setArtist: actions.setArtist,
		getArtist: actions.getArtist,
		clearAllArtists: actions.clearArtists,
	}
}

export function useUIState() {
	const { state, actions } = useAppState()
	return {
		ui: state.ui,
		setLoading: actions.setLoading,
		setSearchQuery: actions.setSearchQuery,
		setCurrentPage: actions.setCurrentPage,
		setSearchType: actions.setSearchType,
		setError: actions.setError,
	}
}

export function useNavigationState() {
	const { state, actions } = useAppState()
	return {
		navigation: state.navigation,
		setPreviousPage: actions.setPreviousPage,
		addBreadcrumb: actions.addBreadcrumb,
		clearBreadcrumbs: actions.clearBreadcrumbs,
	}
}
