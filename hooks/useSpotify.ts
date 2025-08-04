'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useAppState } from '@/contexts/AppStateProvider'
import api from '@/config/api'
import {
	SpotifyAlbumsResponse,
	SpotifySearchResponse,
	SpotifyAlbumSearchResponse,
	SpotifyTopTracksResponse,
	SpotifyArtist,
	SearchType,
	SearchHookParams,
	ArtistAlbumsHookParams,
} from '@/types'

export function useOptimizedSearchArtists({
	query,
	page = 1,
	enabled = true,
}: SearchHookParams) {
	const queryClient = useQueryClient()
	const { actions } = useAppState()

	return useQuery({
		queryKey: ['artists', query, page],
		queryFn: async (): Promise<SpotifySearchResponse> => {
			if (!query.trim()) {
				return { artists: { items: [], total: 0, limit: 20, offset: 0 } }
			}

			actions.setLoading(true)
			actions.setError(null)

			try {
				const response = await createSearchQuery(query, 'artist', page)

				response.artists.items.forEach((artist: SpotifyArtist) => {
					actions.setArtist(artist.id, artist)
					queryClient.setQueryData(['artist', artist.id], artist)
				})

				actions.setLoading(false)
				return response
			} catch (error) {
				actions.setLoading(false)
				actions.setError(
					error instanceof Error ? error.message : 'Unknown error'
				)
				throw error
			}
		},
		enabled: enabled && query.length > 2,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		...retryConfig,
	})
}

export function useOptimizedSearchAlbums({
	query,
	page = 1,
	enabled = true,
}: SearchHookParams) {
	const { actions } = useAppState()

	return useQuery({
		queryKey: ['search-albums', query, page],
		queryFn: async (): Promise<SpotifyAlbumSearchResponse> => {
			if (!query.trim()) {
				return { albums: { items: [], total: 0, limit: 20, offset: 0 } }
			}

			actions.setLoading(true)
			actions.setError(null)

			try {
				const response = await createSearchQuery(query, 'album', page)
				actions.setLoading(false)
				return response
			} catch (error) {
				actions.setLoading(false)
				actions.setError(
					error instanceof Error ? error.message : 'Unknown error'
				)
				throw error
			}
		},
		enabled: enabled && query.length > 2,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		...retryConfig,
	})
}

export function useOptimizedArtist(artistId: string) {
	const { actions } = useAppState()

	const cachedArtist = actions.getArtist(artistId)

	return useQuery({
		queryKey: ['artist', artistId],
		queryFn: async (): Promise<SpotifyArtist> => {
			actions.setLoading(true)
			actions.setError(null)

			try {
				const response = await api.get(`/v1/artists/${artistId}`)
				const artist = response.data

				actions.setArtist(artistId, artist)

				actions.setLoading(false)
				return artist
			} catch (error) {
				actions.setLoading(false)
				actions.setError(
					error instanceof Error ? error.message : 'Unknown error'
				)
				throw error
			}
		},
		enabled: !!artistId,
		staleTime: 15 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
		initialData: cachedArtist,
		refetchOnMount: !cachedArtist,
		refetchOnWindowFocus: false,
	})
}

export function useOptimizedArtistAlbums({
	artistId,
	page = 1,
}: ArtistAlbumsHookParams) {
	const { actions } = useAppState()
	const offset = (page - 1) * 20

	return useQuery({
		queryKey: ['albums', artistId, page],
		queryFn: async (): Promise<SpotifyAlbumsResponse> => {
			actions.setLoading(true)
			actions.setError(null)

			try {
				const response = await api.get(`/v1/artists/${artistId}/albums`, {
					params: {
						limit: 20,
						type: 'album',
						include_groups: 'album',
						offset,
					},
				})

				actions.setLoading(false)
				return response.data
			} catch (error) {
				actions.setLoading(false)
				actions.setError(
					error instanceof Error ? error.message : 'Unknown error'
				)
				throw error
			}
		},
		enabled: !!artistId,
		staleTime: 10 * 60 * 1000,
		gcTime: 15 * 60 * 1000,
	})
}

export function useOptimizedArtistTopTracks({
	artistId,
}: ArtistAlbumsHookParams) {
	const { actions } = useAppState()

	return useQuery({
		queryKey: ['top-tracks', artistId],
		queryFn: async (): Promise<SpotifyTopTracksResponse> => {
			actions.setLoading(true)
			actions.setError(null)

			try {
				const response = await api.get(`/v1/artists/${artistId}/top-tracks`, {
					params: {
						market: 'BR',
					},
				})

				actions.setLoading(false)
				return response.data
			} catch (error) {
				actions.setLoading(false)
				actions.setError(
					error instanceof Error ? error.message : 'Unknown error'
				)
				throw error
			}
		},
		enabled: !!artistId,
		staleTime: 10 * 60 * 1000,
		gcTime: 15 * 60 * 1000,
	})
}

const createSearchQuery = async (
	query: string,
	type: SearchType,
	page: number
) => {
	const response = await api.get('/v1/search', {
		params: {
			q: query,
			type,
			limit: 20,
			offset: (page - 1) * 20,
		},
	})
	return response.data
}

const retryConfig = {
	retry: (failureCount: number, error: unknown) => {
		const httpError = error as { response?: { status?: number } }
		if (
			httpError?.response?.status &&
			httpError.response.status >= 400 &&
			httpError.response.status < 500
		) {
			return false
		}
		return failureCount < 3
	},
	retryDelay: (attemptIndex: number) =>
		Math.min(1000 * 2 ** attemptIndex, 30000),
}

export function useSearchState() {
	const { state, actions } = useAppState()
	const queryClient = useQueryClient()

	const handleSearch = useCallback(
		(query: string) => {
			actions.setSearchQuery(query)
			actions.setCurrentPage(1)
			actions.setError(null)
		},
		[actions]
	)

	const handlePageChange = useCallback(
		(page: number) => {
			actions.setCurrentPage(page)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		},
		[actions]
	)

	const handleTypeChange = useCallback(
		(type: SearchType) => {
			actions.setSearchType(type)
			actions.setCurrentPage(1)
		},
		[actions]
	)

	const clearSearch = useCallback(() => {
		actions.setSearchQuery('')
		actions.setCurrentPage(1)
		actions.setError(null)
		queryClient.removeQueries({ queryKey: ['artists'] })
		queryClient.removeQueries({ queryKey: ['search-albums'] })
	}, [actions, queryClient])

	const prefetchNextPage = useCallback(() => {
		const nextPage = state.ui.currentPage + 1
		if (!state.ui.searchQuery) return

		const queryKey =
			state.ui.searchType === 'artist'
				? ['artists', state.ui.searchQuery, nextPage]
				: ['search-albums', state.ui.searchQuery, nextPage]

		if (queryClient.getQueryData(queryKey)) return

		queryClient.prefetchQuery({
			queryKey,
			queryFn: () =>
				createSearchQuery(state.ui.searchQuery, state.ui.searchType, nextPage),
			staleTime: 5 * 60 * 1000,
		})
	}, [state.ui, queryClient])

	return {
		searchQuery: state.ui.searchQuery,
		currentPage: state.ui.currentPage,
		searchType: state.ui.searchType,
		isLoading: state.ui.isLoading,
		error: state.ui.lastError,
		handleSearch,
		handlePageChange,
		handleTypeChange,
		clearSearch,
		prefetchNextPage,
	}
}

export function useCacheOptimization() {
	const queryClient = useQueryClient()
	const { actions } = useAppState()

	const cleanupCache = useCallback(() => {
		queryClient.removeQueries({
			predicate: query => {
				const cacheTime = query.state.dataUpdatedAt
				const oneHourAgo = Date.now() - 60 * 60 * 1000
				return cacheTime < oneHourAgo
			},
		})

		actions.clearArtists()
	}, [queryClient, actions])

	const getStats = useCallback(() => {
		const queryCache = queryClient.getQueryCache()
		return {
			totalQueries: queryCache.getAll().length,
			totalArtists: Object.keys(actions.getArtist('') || {}).length,
		}
	}, [queryClient, actions])

	return {
		cleanupCache,
		getStats,
	}
}
