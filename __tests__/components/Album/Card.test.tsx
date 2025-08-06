import { render, screen } from '@testing-library/react'
import AlbumCard from '@/components/Album/Card'


const mockAlbum = {
	id: 'album-1',
	name: 'Test Album',
	album_type: 'album',
	total_tracks: 12,
	release_date: '2023-01-15',
	images: [
		{
			url: 'https://example.com/album-image.jpg',
			height: 640,
			width: 640,
		},
	],
	external_urls: {
		spotify: 'https://open.spotify.com/album/test-album',
	},
	artists: [
		{
			id: 'artist-1',
			name: 'Test Artist',
			external_urls: {
				spotify: 'https://open.spotify.com/artist/artist-1',
			},
		},
		{
			id: 'artist-2',
			name: 'Featured Artist',
			external_urls: {
				spotify: 'https://open.spotify.com/artist/artist-2',
			},
		},
	],
}

jest.mock('next/image', () => ({
	__esModule: true,
	default: ({ src, alt }: { src: string; alt: string }) => (
		<ImageMock src={src} alt={alt} />
	),
}))

const ImageMock = ({ src, alt }: { src: string; alt: string }) => (
	<span data-testid="next-image" data-src={src} data-alt={alt} />
)

jest.mock('lucide-react', () => ({
	Calendar: () => <span data-testid="calendar-icon" />,
	ExternalLink: () => <span data-testid="external-link-icon" />,
	Music: () => <span data-testid="music-icon" />,
}))

const renderWithI18n = (component: React.ReactElement) => {
	return render(component)
}

describe('AlbumCard', () => {
	it('renders album information correctly', () => {
		renderWithI18n(<AlbumCard album={mockAlbum} />)

		expect(screen.getByText('Test Album')).toBeInTheDocument()
		expect(screen.getByText('2023')).toBeInTheDocument()
		expect(screen.getByText('album')).toBeInTheDocument()
	})

	it('renders album image with correct attributes', () => {
		renderWithI18n(<AlbumCard album={mockAlbum} />)

		const image = screen.getByTestId('next-image')
		expect(image).toHaveAttribute(
			'data-src',
			'https://example.com/album-image.jpg'
		)
		expect(image).toHaveAttribute('data-alt', 'Test Album')
	})

	it('uses placeholder image when no image available', () => {
		const albumWithoutImage = {
			...mockAlbum,
			images: [],
		}

		renderWithI18n(<AlbumCard album={albumWithoutImage} />)

		const image = screen.getByTestId('next-image')
		expect(image.getAttribute('data-src')).toContain('placehold.co')
	})

	it('displays multiple artists correctly', () => {
		renderWithI18n(<AlbumCard album={mockAlbum} />)

		expect(screen.getByText(/Test Artist, Featured Artist/)).toBeInTheDocument()
	})

	it('displays single artist correctly', () => {
		const albumWithSingleArtist = {
			...mockAlbum,
			artists: [mockAlbum.artists[0]],
		}

		renderWithI18n(<AlbumCard album={albumWithSingleArtist} />)

		expect(screen.getByText(/Test Artist/)).toBeInTheDocument()
	})

	it('links to Spotify album page', () => {
		renderWithI18n(<AlbumCard album={mockAlbum} />)

		const link = screen.getByRole('link')
		expect(link).toHaveAttribute(
			'href',
			'https://open.spotify.com/album/test-album'
		)
		expect(link).toHaveAttribute('target', '_blank')
		expect(link).toHaveAttribute('rel', 'noopener noreferrer')
	})

	it('displays release year correctly', () => {
		renderWithI18n(<AlbumCard album={mockAlbum} />)

		expect(screen.getByTestId('calendar-icon')).toBeInTheDocument()
		expect(screen.getByText('2023')).toBeInTheDocument()
	})

	it('displays track count correctly', () => {
		renderWithI18n(<AlbumCard album={mockAlbum} />)

		expect(screen.getByTestId('music-icon')).toBeInTheDocument()
		expect(screen.getByText(/12/)).toBeInTheDocument()
	})

	it('displays album type badge correctly', () => {
		renderWithI18n(<AlbumCard album={mockAlbum} />)

		const badge = screen.getByText('album')
		expect(badge).toHaveClass('bg-blue-100', 'text-blue-800', 'capitalize')
	})

	it('handles different album types', () => {
		const singleAlbum = {
			...mockAlbum,
			album_type: 'single',
		}

		renderWithI18n(<AlbumCard album={singleAlbum} />)

		expect(screen.getByText('single')).toBeInTheDocument()
	})

	it('displays external link icon', () => {
		renderWithI18n(<AlbumCard album={mockAlbum} />)

		expect(screen.getByTestId('external-link-icon')).toBeInTheDocument()
	})

	it('handles release date with different formats', () => {
		const albumWithDifferentDate = {
			...mockAlbum,
			release_date: '2020-12-31',
		}

		renderWithI18n(<AlbumCard album={albumWithDifferentDate} />)

		expect(screen.getByText('2020')).toBeInTheDocument()
	})

	it('applies correct CSS classes for hover effects', () => {
		renderWithI18n(<AlbumCard album={mockAlbum} />)

		const link = screen.getByRole('link')
		expect(link).toHaveClass(
			'bg-white',
			'rounded-lg',
			'shadow-md',
			'hover:shadow-lg',
			'transition-all',
			'border-2',
			'border-transparent',
			'hover:border-gray-200',
			'cursor-pointer'
		)
	})
})
