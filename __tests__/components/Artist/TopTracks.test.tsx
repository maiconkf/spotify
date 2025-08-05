import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ArtistTopTracks from '@/components/Artist/TopTracks'

jest.mock('@/hooks/useSpotify', () => ({
	useOptimizedArtistTopTracks: jest.fn(),
}))

jest.mock('@/contexts/I18nContext', () => ({
	useI18n: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				'error.subtitle': 'Error occurred',
				'artist.noTopTracks': 'No top tracks available',
				'artist.topTracks': 'Top Tracks',
			}
			return translations[key] || key
		},
	}),
}))

jest.mock('@/components/Artist/TopTracks/TrackItem', () => ({
	__esModule: true,
	default: ({ track, index }: { track: { name: string }; index: number }) => (
		<div data-testid={`track-item-${index}`}>{track.name}</div>
	),
}))

jest.mock('@/components/Artist/TopTracks/ShowMoreButton', () => ({
	__esModule: true,
	default: ({
		showAll,
		onToggle,
		hasMoreTracks,
	}: {
		showAll: boolean
		onToggle: () => void
		hasMoreTracks: boolean
	}) =>
		hasMoreTracks ? (
			<button onClick={onToggle} data-testid="show-more-button">
				{showAll ? 'Show Less' : 'Show More'}
			</button>
		) : null,
}))

jest.mock('@/components/Artist/TopTracks/TopTracksLoading', () => ({
	__esModule: true,
	default: () => <div data-testid="loading-state">Loading tracks...</div>,
}))

jest.mock('@/components/Artist/TopTracks/TopTracksEmptyState', () => ({
	__esModule: true,
	default: ({ message, isError }: { message: string; isError: boolean }) => (
		<div data-testid="empty-state" data-is-error={isError}>
			{message}
		</div>
	),
}))

import { useOptimizedArtistTopTracks } from '@/hooks/useSpotify'

const mockUseOptimizedArtistTopTracks =
	useOptimizedArtistTopTracks as jest.MockedFunction<
		typeof useOptimizedArtistTopTracks
	>

describe('ArtistTopTracks Component', () => {
	const mockArtistId = 'artist123'

	beforeEach(() => {
		jest.clearAllMocks()
	})

	const mockTracks = Array.from({ length: 7 }, (_, i) => ({
		id: `${i + 1}`,
		name: `Track ${i + 1}`,
		duration_ms: 180000,
		explicit: false,
		popularity: 80,
		preview_url: 'https:
		track_number: i + 1,
		external_urls: { spotify: 'https:
		album: {
			id: 'album1',
			name: 'Test Album',
			images: [],
		},
		artists: [{ id: 'artist1', name: 'Test Artist' }],
	}))

	it('should render loading state', () => {
		mockUseOptimizedArtistTopTracks.mockReturnValue({
			data: undefined,
			isLoading: true,
			error: null,
		} as ReturnType<typeof useOptimizedArtistTopTracks>)

		render(<ArtistTopTracks artistId={mockArtistId} />)

		expect(screen.getByTestId('loading-state')).toBeInTheDocument()
	})

	it('should render error state', () => {
		mockUseOptimizedArtistTopTracks.mockReturnValue({
			data: undefined,
			isLoading: false,
			error: new Error('API error'),
		} as ReturnType<typeof useOptimizedArtistTopTracks>)

		render(<ArtistTopTracks artistId={mockArtistId} />)

		const emptyState = screen.getByTestId('empty-state')
		expect(emptyState).toBeInTheDocument()
		expect(emptyState).toHaveAttribute('data-is-error', 'true')
		expect(emptyState).toHaveTextContent('Error occurred')
	})

	it('should render empty state when no tracks', () => {
		mockUseOptimizedArtistTopTracks.mockReturnValue({
			data: { tracks: [] },
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useOptimizedArtistTopTracks>)

		render(<ArtistTopTracks artistId={mockArtistId} />)

		const emptyState = screen.getByTestId('empty-state')
		expect(emptyState).toBeInTheDocument()
		expect(emptyState).toHaveTextContent('No top tracks available')
	})

	it('should render tracks with show more button when more than 5 tracks', () => {
		mockUseOptimizedArtistTopTracks.mockReturnValue({
			data: { tracks: mockTracks },
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useOptimizedArtistTopTracks>)

		render(<ArtistTopTracks artistId={mockArtistId} />)

		expect(screen.getByTestId('track-item-0')).toBeInTheDocument()
		expect(screen.getByTestId('track-item-4')).toBeInTheDocument()
		expect(screen.queryByTestId('track-item-5')).not.toBeInTheDocument()

		expect(screen.getByTestId('show-more-button')).toBeInTheDocument()
	})

	it('should expand tracks when show more button is clicked', () => {
		mockUseOptimizedArtistTopTracks.mockReturnValue({
			data: { tracks: mockTracks },
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useOptimizedArtistTopTracks>)

		render(<ArtistTopTracks artistId={mockArtistId} />)

		const showMoreButton = screen.getByTestId('show-more-button')
		fireEvent.click(showMoreButton)

		expect(screen.getByTestId('track-item-6')).toBeInTheDocument()
	})

	it('should not show more button when 5 or fewer tracks', () => {
		const fewTracks = mockTracks.slice(0, 3)
		mockUseOptimizedArtistTopTracks.mockReturnValue({
			data: { tracks: fewTracks },
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useOptimizedArtistTopTracks>)

		render(<ArtistTopTracks artistId={mockArtistId} />)

		expect(screen.getByTestId('track-item-0')).toBeInTheDocument()
		expect(screen.getByTestId('track-item-2')).toBeInTheDocument()
		expect(screen.queryByTestId('show-more-button')).not.toBeInTheDocument()
	})

	it('should render component title', () => {
		mockUseOptimizedArtistTopTracks.mockReturnValue({
			data: { tracks: mockTracks.slice(0, 3) },
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useOptimizedArtistTopTracks>)

		render(<ArtistTopTracks artistId={mockArtistId} />)

		expect(screen.getByText('Top Tracks')).toBeInTheDocument()
	})
})
