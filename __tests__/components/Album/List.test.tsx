import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AlbumsList from '@/components/Album/List'

interface Album {
	id: string
	name: string
	album_type: string
	release_date: string
	total_tracks: number
	images: { url: string; height: number; width: number }[]
	artists: { id: string; name: string }[]
	external_urls: { spotify: string }
}

jest.mock('@/components/Album/Card', () => ({
	__esModule: true,
	default: ({ album }: { album: Album }) => (
		<div data-testid={`album-card-${album.id}`}>
			<h3>{album.name}</h3>
			<p>{album.release_date}</p>
		</div>
	),
}))

jest.mock('lucide-react', () => ({
	Music: ({ className }: React.HTMLAttributes<HTMLDivElement>) => (
		<div data-testid="music-icon" className={className}>
			Music Icon
		</div>
	),
}))

describe('AlbumsList Component', () => {
	const mockAlbums = [
		{
			id: '1',
			name: 'Album 1',
			album_type: 'album',
			release_date: '2023-01-01',
			total_tracks: 12,
			images: [
				{ url: 'https://example.com/album1.jpg', height: 640, width: 640 },
			],
			artists: [{ id: 'artist1', name: 'Artist 1' }],
			external_urls: { spotify: 'https://spotify.com/album1' },
		},
		{
			id: '2',
			name: 'Album 2',
			album_type: 'single',
			release_date: '2023-06-15',
			total_tracks: 1,
			images: [
				{ url: 'https://example.com/album2.jpg', height: 640, width: 640 },
			],
			artists: [{ id: 'artist1', name: 'Artist 1' }],
			external_urls: { spotify: 'https://spotify.com/album2' },
		},
		{
			id: '3',
			name: 'Album 3',
			album_type: 'album',
			release_date: '2022-12-01',
			total_tracks: 8,
			images: [
				{ url: 'https://example.com/album3.jpg', height: 640, width: 640 },
			],
			artists: [{ id: 'artist1', name: 'Artist 1' }],
			external_urls: { spotify: 'https://spotify.com/album3' },
		},
	]

	it('should render empty state when no albums provided', () => {
		render(<AlbumsList albums={[]} />)

		expect(screen.getByTestId('music-icon')).toBeInTheDocument()
		expect(screen.getByTestId('music-icon')).toHaveClass(
			'h-16',
			'w-16',
			'text-gray-400',
			'mx-auto',
			'mb-4'
		)

		expect(screen.getByText('Nenhum álbum encontrado')).toBeInTheDocument()
		expect(
			screen.getByText('Este artista não possui álbuns disponíveis no momento.')
		).toBeInTheDocument()

		expect(screen.queryByTestId('album-card-1')).not.toBeInTheDocument()
	})

	it('should render album cards when albums are provided', () => {
		render(<AlbumsList albums={mockAlbums} />)

		expect(screen.getByTestId('album-card-1')).toBeInTheDocument()
		expect(screen.getByTestId('album-card-2')).toBeInTheDocument()
		expect(screen.getByTestId('album-card-3')).toBeInTheDocument()

		expect(screen.getByText('Album 1')).toBeInTheDocument()
		expect(screen.getByText('Album 2')).toBeInTheDocument()
		expect(screen.getByText('Album 3')).toBeInTheDocument()
		expect(screen.getByText('2023-01-01')).toBeInTheDocument()
		expect(screen.getByText('2023-06-15')).toBeInTheDocument()
		expect(screen.getByText('2022-12-01')).toBeInTheDocument()

		expect(screen.queryByTestId('music-icon')).not.toBeInTheDocument()
		expect(screen.queryByText('No albums available')).not.toBeInTheDocument()
		expect(
			screen.queryByText('This artist has not released any albums yet.')
		).not.toBeInTheDocument()
	})

	it('should render correct number of album cards', () => {
		render(<AlbumsList albums={mockAlbums} />)

		const albumCards = screen.getAllByTestId(/^album-card-/)
		expect(albumCards).toHaveLength(3)
	})

	it('should render single album correctly', () => {
		const singleAlbum = [mockAlbums[0]]
		render(<AlbumsList albums={singleAlbum} />)

		expect(screen.getByTestId('album-card-1')).toBeInTheDocument()
		expect(screen.getByText('Album 1')).toBeInTheDocument()
		expect(screen.getByText('2023-01-01')).toBeInTheDocument()

		expect(screen.queryByTestId('album-card-2')).not.toBeInTheDocument()
		expect(screen.queryByTestId('album-card-3')).not.toBeInTheDocument()

		expect(screen.queryByTestId('music-icon')).not.toBeInTheDocument()
	})

	it('should maintain grid layout structure', () => {
		render(<AlbumsList albums={mockAlbums} />)

		const gridContainer = screen.getByTestId('album-card-1').parentElement
		expect(gridContainer).toHaveClass(
			'grid',
			'grid-cols-1',
			'md:grid-cols-2',
			'lg:grid-cols-3',
			'xl:grid-cols-4',
			'gap-6'
		)
	})

	it('should handle empty state styling correctly', () => {
		render(<AlbumsList albums={[]} />)

		const emptyStateContainer = screen.getByTestId('music-icon').parentElement
		expect(emptyStateContainer).toHaveClass('text-center', 'py-12')

		const heading = screen.getByText('Nenhum álbum encontrado')
		expect(heading).toHaveClass(
			'text-xl',
			'font-semibold',
			'text-gray-900',
			'mb-2'
		)

		const description = screen.getByText(
			'Este artista não possui álbuns disponíveis no momento.'
		)
		expect(description).toHaveClass('text-gray-600')
	})

	it('should pass correct props to AlbumCard components', () => {
		render(<AlbumsList albums={mockAlbums} />)

		expect(screen.getByText('Album 1')).toBeInTheDocument()
		expect(screen.getByText('Album 2')).toBeInTheDocument()
		expect(screen.getByText('Album 3')).toBeInTheDocument()

		expect(screen.getByText('2023-01-01')).toBeInTheDocument()
		expect(screen.getByText('2023-06-15')).toBeInTheDocument()
		expect(screen.getByText('2022-12-01')).toBeInTheDocument()
	})

	it('should render with different album types', () => {
		const mixedAlbums = [
			{ ...mockAlbums[0], album_type: 'album' },
			{ ...mockAlbums[1], album_type: 'single' },
			{ ...mockAlbums[2], album_type: 'compilation' },
		]

		render(<AlbumsList albums={mixedAlbums} />)

		expect(screen.getByTestId('album-card-1')).toBeInTheDocument()
		expect(screen.getByTestId('album-card-2')).toBeInTheDocument()
		expect(screen.getByTestId('album-card-3')).toBeInTheDocument()
	})
})
