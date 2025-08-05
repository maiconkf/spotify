import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { AppStateProvider, useAppState } from '@/contexts/AppStateProvider'
import type { SpotifyArtist } from '@/types'

const mockArtist: SpotifyArtist = {
	id: '1',
	name: 'The Beatles',
	popularity: 90,
	followers: { total: 1000000 },
	genres: ['rock', 'pop'],
	images: [
		{
			height: 640,
			url: 'https:
			width: 640,
		},
	],
	external_urls: {
		spotify: 'https:
	},
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
	<AppStateProvider>{children}</AppStateProvider>
)

describe('AppStateProvider', () => {
	describe('Artist Management', () => {
		it('should set and get artist', () => {
			const { result } = renderHook(() => useAppState(), { wrapper })

			act(() => {
				result.current.actions.setArtist('1', mockArtist)
			})

			const retrievedArtist = result.current.actions.getArtist('1')
			expect(retrievedArtist).toEqual(mockArtist)
			expect(result.current.state.artists['1']).toEqual(mockArtist)
		})

		it('should clear all artists', () => {
			const { result } = renderHook(() => useAppState(), { wrapper })

			act(() => {
				result.current.actions.setArtist('1', mockArtist)
				result.current.actions.setArtist('2', {
					...mockArtist,
					id: '2',
					name: 'Queen',
				})
			})

			act(() => {
				result.current.actions.clearArtists()
			})

			expect(result.current.state.artists).toEqual({})
			expect(result.current.actions.getArtist('1')).toBeUndefined()
		})

		it('should return undefined for non-existent artist', () => {
			const { result } = renderHook(() => useAppState(), { wrapper })

			const artist = result.current.actions.getArtist('nonexistent')
			expect(artist).toBeUndefined()
		})
	})

	describe('UI State Management', () => {
		it('should manage loading state', () => {
			const { result } = renderHook(() => useAppState(), { wrapper })

			expect(result.current.state.ui.isLoading).toBe(false)

			act(() => {
				result.current.actions.setLoading(true)
			})

			expect(result.current.state.ui.isLoading).toBe(true)

			act(() => {
				result.current.actions.setLoading(false)
			})

			expect(result.current.state.ui.isLoading).toBe(false)
		})

		it('should manage search query and reset page', () => {
			const { result } = renderHook(() => useAppState(), { wrapper })

			act(() => {
				result.current.actions.setCurrentPage(3)
			})

			expect(result.current.state.ui.currentPage).toBe(3)

			act(() => {
				result.current.actions.setSearchQuery('Beatles')
			})

			expect(result.current.state.ui.searchQuery).toBe('Beatles')
			expect(result.current.state.ui.currentPage).toBe(1)
		})

		it('should manage current page', () => {
			const { result } = renderHook(() => useAppState(), { wrapper })

			act(() => {
				result.current.actions.setCurrentPage(5)
			})

			expect(result.current.state.ui.currentPage).toBe(5)
		})

		it('should manage search type and reset page', () => {
			const { result } = renderHook(() => useAppState(), { wrapper })

			act(() => {
				result.current.actions.setCurrentPage(2)
			})

			act(() => {
				result.current.actions.setSearchType('album')
			})

			expect(result.current.state.ui.searchType).toBe('album')
			expect(result.current.state.ui.currentPage).toBe(1)
		})

		it('should manage error state', () => {
			const { result } = renderHook(() => useAppState(), { wrapper })

			const errorMessage = 'Something went wrong'

			act(() => {
				result.current.actions.setError(errorMessage)
			})

			expect(result.current.state.ui.lastError).toBe(errorMessage)

			act(() => {
				result.current.actions.setError(null)
			})

			expect(result.current.state.ui.lastError).toBeNull()
		})
	})

	describe('Navigation State Management', () => {
		it('should manage previous page', () => {
			const { result } = renderHook(() => useAppState(), { wrapper })

			act(() => {
				result.current.actions.setPreviousPage('/artist/123')
			})

			expect(result.current.state.navigation.previousPage).toBe('/artist/123')
		})

		it('should manage breadcrumbs', () => {
			const { result } = renderHook(() => useAppState(), { wrapper })

			act(() => {
				result.current.actions.addBreadcrumb('Home', '/')
				result.current.actions.addBreadcrumb('Search', '/search')
				result.current.actions.addBreadcrumb('Artist', '/artist/1')
			})

			expect(result.current.state.navigation.breadcrumbs).toEqual([
				{ label: 'Home', path: '/' },
				{ label: 'Search', path: '/search' },
				{ label: 'Artist', path: '/artist/1' },
			])

			act(() => {
				result.current.actions.clearBreadcrumbs()
			})

			expect(result.current.state.navigation.breadcrumbs).toEqual([])
		})
	})

	describe('Initial State', () => {
		it('should have correct initial state', () => {
			const { result } = renderHook(() => useAppState(), { wrapper })

			expect(result.current.state).toEqual({
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
			})
		})
	})

	describe('Error Handling', () => {
		it('should throw error when used outside provider', () => {
			const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

			expect(() => {
				renderHook(() => useAppState())
			}).toThrow('useAppState must be used within an AppStateProvider')

			consoleSpy.mockRestore()
		})
	})
})
