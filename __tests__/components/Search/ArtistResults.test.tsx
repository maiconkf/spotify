import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ArtistResults from '@/components/Search/ArtistResults'

jest.mock('@/components/Artist/Card', () => ({
	__esModule: true,
	default: ({ artist }: { artist: { id: string; name: string } }) => (
		<div data-testid={`artist-card-${artist.id}`}>{artist.name}</div>
	),
}))

jest.mock('@/components/Pagination', () => ({
	__esModule: true,
	default: ({
		currentPage,
		totalItems,
		itemsPerPage,
	}: {
		currentPage: number
		totalItems: number
		itemsPerPage: number
		onPageChange: (page: number) => void
	}) => (
		<div data-testid="pagination">
			<span>Page {currentPage}</span>
			<span>Total: {totalItems}</span>
			<span>Per page: {itemsPerPage}</span>
		</div>
	),
}))

jest.mock('@/components/Search/SearchResultsHeader', () => ({
	__esModule: true,
	default: ({
		searchQuery,
		onClearSearch,
	}: {
		searchQuery: string
		onClearSearch: () => void
	}) => (
		<div data-testid="search-results-header">
			<span>Search: {searchQuery}</span>
			<button onClick={onClearSearch} data-testid="clear-search">
				Clear
			</button>
		</div>
	),
}))

jest.mock('@/components/Search/ResultsCounter', () => ({
	__esModule: true,
	default: ({
		offset,
		itemsLength,
		total,
		itemType,
	}: {
		offset: number
		itemsLength: number
		total: number
		itemType: string
	}) => (
		<div data-testid="results-counter">
			{offset + 1}-{offset + itemsLength} of {total} {itemType}
		</div>
	),
}))

describe('ArtistResults Component', () => {
	const mockOnPageChange = jest.fn()
	const mockOnClearSearch = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	const mockArtistsData = {
		artists: {
			items: [
				{
					id: '1',
					name: 'Artist 1',
					popularity: 80,
					followers: { total: 1000000 },
					genres: ['rock', 'pop'],
					images: [
						{
							url: 'https://example.com/image1.jpg',
							height: 640,
							width: 640,
						},
					],
					external_urls: { spotify: 'https://spotify.com/artist1' },
				},
				{
					id: '2',
					name: 'Artist 2',
					popularity: 75,
					followers: { total: 500000 },
					genres: ['jazz', 'blues'],
					images: [
						{
							url: 'https://example.com/image2.jpg',
							height: 640,
							width: 640,
						},
					],
					external_urls: { spotify: 'https://spotify.com/artist2' },
				},
			],
			total: 100,
			limit: 20,
			offset: 0,
		},
	}

	const defaultProps = {
		searchQuery: 'test query',
		artistsData: mockArtistsData,
		currentPage: 1,
		onPageChange: mockOnPageChange,
		onClearSearch: mockOnClearSearch,
	}

	it('should render artist results with all components', () => {
		render(<ArtistResults {...defaultProps} />)

		expect(screen.getByTestId('search-results-header')).toBeInTheDocument()
		expect(screen.getByText('Search: test query')).toBeInTheDocument()

		expect(screen.getByTestId('artist-card-1')).toBeInTheDocument()
		expect(screen.getByTestId('artist-card-2')).toBeInTheDocument()
		expect(screen.getByText('Artist 1')).toBeInTheDocument()
		expect(screen.getByText('Artist 2')).toBeInTheDocument()

		expect(screen.getByTestId('results-counter')).toBeInTheDocument()
		expect(screen.getByText('1-2 of 100 artists')).toBeInTheDocument()

		expect(screen.getByTestId('pagination')).toBeInTheDocument()
		expect(screen.getByText('Page 1')).toBeInTheDocument()
		expect(screen.getByText('Total: 100')).toBeInTheDocument()
		expect(screen.getByText('Per page: 20')).toBeInTheDocument()
	})

	it('should render null when no artistsData provided', () => {
		const { container } = render(
			<ArtistResults {...defaultProps} artistsData={undefined} />
		)

		expect(container.firstChild).toBeNull()
	})

	it('should render null when artists array is empty', () => {
		const emptyArtistsData = {
			artists: {
				items: [],
				total: 0,
				limit: 20,
				offset: 0,
			},
		}

		const { container } = render(
			<ArtistResults {...defaultProps} artistsData={emptyArtistsData} />
		)

		expect(container.firstChild).toBeNull()
	})

	it('should render correct number of artist cards', () => {
		const manyArtistsData = {
			artists: {
				items: Array.from({ length: 5 }, (_, i) => ({
					id: `${i + 1}`,
					name: `Artist ${i + 1}`,
					popularity: 80,
					followers: { total: 1000000 },
					genres: ['rock'],
					images: [
						{
							url: `https://example.com/image.jpg`,
							height: 640,
							width: 640,
						},
					],
					external_urls: { spotify: `https://spotify.com/artist` },
				})),
				total: 5,
				limit: 20,
				offset: 0,
			},
		}

		render(<ArtistResults {...defaultProps} artistsData={manyArtistsData} />)

		for (let i = 1; i <= 5; i++) {
			expect(screen.getByTestId(`artist-card-${i}`)).toBeInTheDocument()
			expect(screen.getByText(`Artist ${i}`)).toBeInTheDocument()
		}
	})

	it('should pass correct props to child components', () => {
		render(<ArtistResults {...defaultProps} />)

		expect(screen.getByText('Search: test query')).toBeInTheDocument()
		expect(screen.getByTestId('clear-search')).toBeInTheDocument()

		expect(screen.getByText('1-2 of 100 artists')).toBeInTheDocument()

		expect(screen.getByText('Page 1')).toBeInTheDocument()
		expect(screen.getByText('Total: 100')).toBeInTheDocument()
		expect(screen.getByText('Per page: 20')).toBeInTheDocument()
	})

	it('should handle different offset values in ResultsCounter', () => {
		const offsetArtistsData = {
			...mockArtistsData,
			artists: {
				...mockArtistsData.artists,
				offset: 20,
			},
		}

		render(
			<ArtistResults
				{...defaultProps}
				artistsData={offsetArtistsData}
				currentPage={2}
			/>
		)

		expect(screen.getByText('21-22 of 100 artists')).toBeInTheDocument()
		expect(screen.getByText('Page 2')).toBeInTheDocument()
	})

	it('should render with forward ref', () => {
		const ref = React.createRef<HTMLDivElement>()

		render(<ArtistResults {...defaultProps} ref={ref} />)

		expect(ref.current).toBeInTheDocument()
	})

	it('should maintain grid layout structure', () => {
		render(<ArtistResults {...defaultProps} />)

		const gridContainer = screen.getByTestId('artist-card-1').parentElement
		expect(gridContainer).toHaveClass(
			'grid',
			'grid-cols-1',
			'md:grid-cols-2',
			'lg:grid-cols-3',
			'xl:grid-cols-4',
			'gap-6'
		)
	})
})
