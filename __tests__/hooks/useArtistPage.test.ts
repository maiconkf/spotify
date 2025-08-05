import { renderHook, act } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { useArtistPage } from '@/hooks/useArtistPage'
import { useArtistContext } from '@/contexts/ArtistContext'
import {
	useOptimizedArtist,
	useOptimizedArtistAlbums,
} from '@/hooks/useSpotify'

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
	useParams: () => ({
		locale: 'pt-BR',
	}),
}))

jest.mock('@/contexts/ArtistContext', () => ({
	useArtistContext: jest.fn(),
}))

jest.mock('@/hooks/useSpotify', () => ({
	useOptimizedArtist: jest.fn(),
	useOptimizedArtistAlbums: jest.fn(),
}))

const mockPush = jest.fn()
const mockBack = jest.fn()
const mockGetArtist = jest.fn()
const mockSetArtist = jest.fn()

Object.defineProperty(window, 'open', {
	value: jest.fn(),
	writable: true,
})

Object.defineProperty(Element.prototype, 'scrollIntoView', {
	value: jest.fn(),
	writable: true,
})

describe('useArtistPage', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		;(useRouter as jest.Mock).mockReturnValue({
			push: mockPush,
			back: mockBack,
		})
		;(useArtistContext as jest.Mock).mockReturnValue({
			getArtist: mockGetArtist,
			setArtist: mockSetArtist,
		})
		;(useOptimizedArtist as jest.Mock).mockReturnValue({
			data: null,
			isLoading: false,
			error: null,
		})
		;(useOptimizedArtistAlbums as jest.Mock).mockReturnValue({
			data: null,
			isLoading: false,
			error: null,
		})
	})

	it('should initialize with default values', () => {
		const { result } = renderHook(() => useArtistPage('artist123'))

		expect(result.current.artistData).toBeNull()
		expect(result.current.currentPage).toBe(1)
		expect(result.current.isArtistLoading).toBe(false)
		expect(result.current.isAlbumsLoading).toBe(false)
	})

	it('should handle navigation home', () => {
		const { result } = renderHook(() => useArtistPage('artist123'))

		act(() => {
			result.current.goHome()
		})

		expect(mockPush).toHaveBeenCalledWith('/pt-BR')
	})

	it('should handle back navigation', () => {
		const savedState = JSON.stringify({
			query: 'test',
			page: 1,
			type: 'artist',
		})
		Object.defineProperty(window, 'sessionStorage', {
			value: {
				getItem: jest.fn(() => savedState),
			},
			writable: true,
		})

		const { result } = renderHook(() => useArtistPage('artist123'))

		act(() => {
			result.current.handleBack()
		})

		expect(mockPush).toHaveBeenCalledWith('/pt-BR?q=test&page=1&type=artist')
	})

	it('should handle page changes', () => {
		const { result } = renderHook(() => useArtistPage('artist123'))

		act(() => {
			result.current.handlePageChange(2)
		})

		expect(result.current.currentPage).toBe(2)
	})

	it('should open Spotify links', () => {
		const { result } = renderHook(() => useArtistPage('artist123'))
		const mockUrl = 'https://open.spotify.com/artist/test'

		act(() => {
			result.current.openSpotifyLink(mockUrl)
		})

		expect(window.open).toHaveBeenCalledWith(mockUrl, '_blank')
	})

	it('should use context artist when available', () => {
		const mockArtist = { id: 'artist123', name: 'Test Artist' }
		mockGetArtist.mockReturnValue(mockArtist)

		const { result } = renderHook(() => useArtistPage('artist123'))

		expect(result.current.artistData).toBe(mockArtist)
	})

	it('should use fetched artist when context artist is not available', () => {
		const mockArtist = { id: 'artist123', name: 'Fetched Artist' }
		mockGetArtist.mockReturnValue(null)
		;(useOptimizedArtist as jest.Mock).mockReturnValue({
			data: mockArtist,
			isLoading: false,
			error: null,
		})

		renderHook(() => useArtistPage('artist123'))

		expect(mockSetArtist).toHaveBeenCalledWith('artist123', mockArtist)
	})

	it('should handle loading states from hooks', () => {
		;(useOptimizedArtist as jest.Mock).mockReturnValue({
			data: null,
			isLoading: true,
			error: null,
		})
		;(useOptimizedArtistAlbums as jest.Mock).mockReturnValue({
			data: null,
			isLoading: true,
			error: null,
		})

		const { result } = renderHook(() => useArtistPage('artist123'))

		expect(result.current.isArtistLoading).toBe(true)
		expect(result.current.isAlbumsLoading).toBe(true)
	})

	it('should handle error states from hooks', () => {
		const artistError = new Error('Artist error')
		const albumsError = new Error('Albums error')

		;(useOptimizedArtist as jest.Mock).mockReturnValue({
			data: null,
			isLoading: false,
			error: artistError,
		})
		;(useOptimizedArtistAlbums as jest.Mock).mockReturnValue({
			data: null,
			isLoading: false,
			error: albumsError,
		})

		const { result } = renderHook(() => useArtistPage('artist123'))

		expect(result.current.artistError).toBe(artistError)
		expect(result.current.albumsError).toBe(albumsError)
	})
})
