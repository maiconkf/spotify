import { render } from '@testing-library/react'
import ArtistLayout, {
	generateMetadata,
} from '@/app/[locale]/artist/[id]/layout'
import { getAuthHeaders } from '@/lib/spotifyAuth'

jest.mock('@/lib/spotifyAuth', () => ({
	getAuthHeaders: jest.fn(),
}))

global.fetch = jest.fn()

const mockGetAuthHeaders = getAuthHeaders as jest.Mock

describe('ArtistLayout', () => {
	it('should render children', () => {
		const mockParams = Promise.resolve({ locale: 'pt-BR', id: 'artist123' })

		const { container } = render(
			<ArtistLayout params={mockParams}>
				<div data-testid="child-content">Test Content</div>
			</ArtistLayout>
		)

		expect(container.firstChild).toBeInTheDocument()
		expect(
			container.querySelector('[data-testid="child-content"]')
		).toBeInTheDocument()
	})
})

describe('generateMetadata', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		;(fetch as jest.Mock).mockClear()
	})

	it('should generate metadata with artist data', async () => {
		const mockArtistData = {
			name: 'Test Artist',
			images: [
				{ url: 'https://example.com/image.jpg', height: 300, width: 300 },
			],
		}

		mockGetAuthHeaders.mockResolvedValue({
			Authorization: 'Bearer test-token',
		})
		;(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockArtistData),
		})

		const metadata = await generateMetadata({
			params: Promise.resolve({ id: 'artist123', locale: 'pt-BR' }),
		})

		expect(metadata.title).toBe(
			'Test Artist - Página do Artista | Kanastra Spotify'
		)
		expect(metadata.description).toBe(
			'Descubra mais sobre Test Artist. Ouça suas principais músicas e explore seus álbuns no Spotify.'
		)
		expect(metadata.openGraph?.title).toBe('Test Artist - Página do Artista')
		expect(metadata.openGraph?.images).toEqual([
			'https://example.com/image.jpg',
		])
	})

	it('should generate default metadata when artist data not found', async () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

		mockGetAuthHeaders.mockResolvedValue({
			Authorization: 'Bearer test-token',
		})
		;(fetch as jest.Mock).mockResolvedValue({
			ok: false,
		})

		const metadata = await generateMetadata({
			params: Promise.resolve({ id: 'artist123', locale: 'pt-BR' }),
		})

		expect(metadata.title).toBe('Página do Artista | Kanastra Spotify')
		expect(metadata.description).toBe(
			'Descubra mais sobre este artista no Spotify.'
		)

		consoleSpy.mockRestore()
	})

	it('should generate default metadata when fetch throws error', async () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

		mockGetAuthHeaders.mockRejectedValue(new Error('Auth failed'))

		const metadata = await generateMetadata({
			params: Promise.resolve({ id: 'artist123', locale: 'pt-BR' }),
		})

		expect(metadata.title).toBe('Página do Artista | Kanastra Spotify')
		expect(metadata.description).toBe(
			'Descubra mais sobre este artista no Spotify.'
		)

		consoleSpy.mockRestore()
	})

	it('should handle artist data without images', async () => {
		const mockArtistData = {
			name: 'Test Artist',
			images: [],
		}

		mockGetAuthHeaders.mockResolvedValue({
			Authorization: 'Bearer test-token',
		})
		;(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockArtistData),
		})

		const metadata = await generateMetadata({
			params: Promise.resolve({ id: 'artist123', locale: 'pt-BR' }),
		})

		expect(metadata.title).toBe(
			'Test Artist - Página do Artista | Kanastra Spotify'
		)
		expect(metadata.openGraph?.images).toEqual([])
	})

	it('should handle missing artist images array', async () => {
		const mockArtistData = {
			name: 'Test Artist',
		}

		mockGetAuthHeaders.mockResolvedValue({
			Authorization: 'Bearer test-token',
		})
		;(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockArtistData),
		})

		const metadata = await generateMetadata({
			params: Promise.resolve({ id: 'artist123', locale: 'pt-BR' }),
		})

		expect(metadata.title).toBe(
			'Test Artist - Página do Artista | Kanastra Spotify'
		)
		expect(metadata.openGraph?.images).toEqual([])
	})

	it('should call fetch with correct parameters', async () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

		mockGetAuthHeaders.mockResolvedValue({
			Authorization: 'Bearer test-token',
		})
		;(fetch as jest.Mock).mockResolvedValue({
			ok: false,
		})

		await generateMetadata({
			params: Promise.resolve({ id: 'artist123', locale: 'pt-BR' }),
		})

		expect(fetch).toHaveBeenCalledWith(
			'https://api.spotify.com/v1/artists/artist123',
			{
				headers: {
					Authorization: 'Bearer test-token',
					'Content-Type': 'application/json',
				},
			}
		)

		consoleSpy.mockRestore()
	})
})
