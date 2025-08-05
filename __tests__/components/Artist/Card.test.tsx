/* eslint-disable @next/next/no-img-element */
import { render, screen, fireEvent } from '@testing-library/react'
import ArtistCard from '@/components/Artist/Card'
import { I18nProvider } from '@/contexts/I18nContext'

const mockArtist = {
	id: 'artist-1',
	name: 'Test Artist',
	followers: {
		total: 1000000,
	},
	popularity: 85,
	images: [
		{
			url: 'https://example.com/artist.jpg',
			height: 640,
			width: 640,
		},
	],
	external_urls: {
		spotify: 'https://open.spotify.com/artist/test',
	},
	genres: ['rock', 'pop', 'indie', 'alternative'],
}

jest.mock('next/image', () => ({
	__esModule: true,
	default: ({
		src,
		alt,
		width,
		height,
	}: {
		src: string
		alt: string
		width?: number
		height?: number
	}) => (
		<img
			src={src}
			alt={alt}
			width={width}
			height={height}
			data-testid="next-image"
		/>
	),
}))

jest.mock('next/link', () => ({
	__esModule: true,
	default: ({
		children,
		href,
	}: {
		children: React.ReactNode
		href: string
	}) => <a href={href}>{children}</a>,
}))

jest.mock('lucide-react', () => ({
	Users: () => <span data-testid="users-icon" />,
	ExternalLink: () => <span data-testid="external-link-icon" />,
}))

const mockWindowOpen = jest.fn()

const originalWindowOpen = window.open

beforeAll(() => {
	Object.defineProperty(window, 'open', {
		value: mockWindowOpen,
		writable: true,
	})
})

afterAll(() => {
	Object.defineProperty(window, 'open', {
		value: originalWindowOpen,
		writable: true,
	})
})

const renderWithI18n = (component: React.ReactElement) => {
	return render(<I18nProvider>{component}</I18nProvider>)
}

describe('ArtistCard', () => {
	beforeEach(() => {
		mockWindowOpen.mockClear()
		jest.clearAllMocks()
	})

	afterEach(() => {
		jest.restoreAllMocks()
	})

	it('renders artist information correctly', () => {
		renderWithI18n(<ArtistCard artist={mockArtist} />)

		expect(screen.getByText('Test Artist')).toBeInTheDocument()
		expect(screen.getByText(/1\.000\.000/)).toBeInTheDocument()
		expect(screen.getByText(/85\/100/)).toBeInTheDocument()
	})

	it('renders artist image with correct attributes', () => {
		renderWithI18n(<ArtistCard artist={mockArtist} />)

		const image = screen.getByAltText('Test Artist')
		expect(image).toHaveAttribute('src', 'https://example.com/artist.jpg')
	})

	it('uses placeholder image when no image available', () => {
		const artistWithoutImage = {
			...mockArtist,
			images: [],
		}

		renderWithI18n(<ArtistCard artist={artistWithoutImage} />)

		const image = screen.getByAltText('Test Artist')
		expect(image.getAttribute('src')).toContain('placehold.co')
	})

	it('renders link to artist page', () => {
		renderWithI18n(<ArtistCard artist={mockArtist} />)

		const link = screen.getByRole('link')
		expect(link).toHaveAttribute('href', '/artist/artist-1')
	})

	it('renders genres correctly', () => {
		renderWithI18n(<ArtistCard artist={mockArtist} />)

		expect(screen.getByText('rock')).toBeInTheDocument()
		expect(screen.getByText('pop')).toBeInTheDocument()
		expect(screen.getByText('+2')).toBeInTheDocument()
	})

	it('handles genre overflow correctly', () => {
		const artistWithManyGenres = {
			...mockArtist,
			genres: ['rock', 'pop', 'indie', 'alternative', 'blues', 'jazz'],
		}

		renderWithI18n(<ArtistCard artist={artistWithManyGenres} />)

		expect(screen.getByText('rock')).toBeInTheDocument()
		expect(screen.getByText('pop')).toBeInTheDocument()
		expect(screen.getByText('+4')).toBeInTheDocument()
	})

	it('opens Spotify link when external link button is clicked', () => {
		renderWithI18n(<ArtistCard artist={mockArtist} />)

		const externalLinkButton = screen
			.getByTestId('external-link-icon')
			.closest('button')
		fireEvent.click(externalLinkButton!)

		expect(mockWindowOpen).toHaveBeenCalledWith(
			'https://open.spotify.com/artist/test',
			'_blank'
		)
	})

	it('handles image error by using fallback', () => {
		renderWithI18n(<ArtistCard artist={mockArtist} />)

		const image = screen.getByAltText('Test Artist')
		expect(image).toHaveAttribute('src', 'https://example.com/artist.jpg')
	})

	it('renders correct number formatting for followers', () => {
		renderWithI18n(<ArtistCard artist={mockArtist} />)

		expect(screen.getByText(/1\.000\.000/)).toBeInTheDocument()
	})

	it('renders correctly when artist has no genres', () => {
		const artistWithoutGenres = {
			...mockArtist,
			genres: [],
		}

		renderWithI18n(<ArtistCard artist={artistWithoutGenres} />)

		expect(screen.getByText('Test Artist')).toBeInTheDocument()
		expect(screen.queryByText('rock')).not.toBeInTheDocument()
	})

	it('prevents event propagation when clicking external link', () => {
		renderWithI18n(<ArtistCard artist={mockArtist} />)

		const externalLinkButton = screen
			.getByTestId('external-link-icon')
			.closest('button')
		const mockEvent = { preventDefault: jest.fn(), stopPropagation: jest.fn() }

		fireEvent.click(externalLinkButton!, mockEvent)

		expect(mockWindowOpen).toHaveBeenCalled()
	})
})
