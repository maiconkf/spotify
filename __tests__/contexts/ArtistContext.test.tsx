import { render, screen, act } from '@testing-library/react'
import { ArtistProvider, useArtistContext } from '@/contexts/ArtistContext'
import { SpotifyArtist } from '@/types'

const mockArtist: SpotifyArtist = {
	id: 'artist123',
	name: 'Test Artist',
	images: [{ url: 'https://example.com/image.jpg', height: 300, width: 300 }],
	genres: ['rock', 'pop'],
	followers: { total: 1000000 },
	popularity: 85,
	external_urls: {
		spotify: 'https://open.spotify.com/artist/artist123',
	},
}

const mockArtist2: SpotifyArtist = {
	id: 'artist456',
	name: 'Another Artist',
	images: [],
	genres: ['jazz'],
	followers: { total: 500000 },
	popularity: 70,
	external_urls: {
		spotify: 'https://open.spotify.com/artist/artist456',
	},
}

function TestComponent() {
	const { artists, setArtist, getArtist, clearAllArtists } = useArtistContext()

	return (
		<div>
			<div data-testid="artists-count">{Object.keys(artists).length}</div>
			<button
				data-testid="add-artist-1"
				onClick={() => setArtist(mockArtist.id, mockArtist)}
			>
				Add Artist 1
			</button>
			<button
				data-testid="add-artist-2"
				onClick={() => setArtist(mockArtist2.id, mockArtist2)}
			>
				Add Artist 2
			</button>
			<button
				data-testid="get-artist-1"
				onClick={() => {
					const artist = getArtist(mockArtist.id)
					if (artist) {
						const element = document.createElement('div')
						element.textContent = artist.name
						element.setAttribute('data-testid', 'artist-1-name')
						document.body.appendChild(element)
					}
				}}
			>
				Get Artist 1
			</button>
			<button
				data-testid="get-nonexistent-artist"
				onClick={() => {
					const artist = getArtist('nonexistent')
					const element = document.createElement('div')
					element.textContent = artist ? 'found' : 'not-found'
					element.setAttribute('data-testid', 'nonexistent-result')
					document.body.appendChild(element)
				}}
			>
				Get Nonexistent Artist
			</button>
			<button data-testid="clear-all" onClick={clearAllArtists}>
				Clear All
			</button>
		</div>
	)
}

describe('ArtistContext', () => {
	afterEach(() => {
		const addedElements = document.querySelectorAll(
			'[data-testid="artist-1-name"], [data-testid="nonexistent-result"]'
		)
		addedElements.forEach(el => el.remove())
	})

	it('should provide initial empty state', () => {
		render(
			<ArtistProvider>
				<TestComponent />
			</ArtistProvider>
		)

		expect(screen.getByTestId('artists-count')).toHaveTextContent('0')
	})

	it('should add artists to the context', () => {
		render(
			<ArtistProvider>
				<TestComponent />
			</ArtistProvider>
		)

		act(() => {
			screen.getByTestId('add-artist-1').click()
		})

		expect(screen.getByTestId('artists-count')).toHaveTextContent('1')

		act(() => {
			screen.getByTestId('add-artist-2').click()
		})

		expect(screen.getByTestId('artists-count')).toHaveTextContent('2')
	})

	it('should retrieve artists from the context', () => {
		render(
			<ArtistProvider>
				<TestComponent />
			</ArtistProvider>
		)

		act(() => {
			screen.getByTestId('add-artist-1').click()
		})

		act(() => {
			screen.getByTestId('get-artist-1').click()
		})

		expect(screen.getByTestId('artist-1-name')).toHaveTextContent('Test Artist')
	})

	it('should return undefined for nonexistent artist', () => {
		render(
			<ArtistProvider>
				<TestComponent />
			</ArtistProvider>
		)

		act(() => {
			screen.getByTestId('get-nonexistent-artist').click()
		})

		expect(screen.getByTestId('nonexistent-result')).toHaveTextContent(
			'not-found'
		)
	})

	it('should clear all artists', () => {
		render(
			<ArtistProvider>
				<TestComponent />
			</ArtistProvider>
		)

		act(() => {
			screen.getByTestId('add-artist-1').click()
			screen.getByTestId('add-artist-2').click()
		})

		expect(screen.getByTestId('artists-count')).toHaveTextContent('2')

		act(() => {
			screen.getByTestId('clear-all').click()
		})

		expect(screen.getByTestId('artists-count')).toHaveTextContent('0')
	})

	it('should update existing artist when setting with same id', () => {
		render(
			<ArtistProvider>
				<TestComponent />
			</ArtistProvider>
		)

		act(() => {
			screen.getByTestId('add-artist-1').click()
		})

		expect(screen.getByTestId('artists-count')).toHaveTextContent('1')

		act(() => {
			screen.getByTestId('add-artist-1').click()
		})

		expect(screen.getByTestId('artists-count')).toHaveTextContent('1')
	})

	it('should throw error when useArtistContext is used outside provider', () => {
		function ComponentOutsideProvider() {
			useArtistContext()
			return <div>Should not render</div>
		}

		const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

		expect(() => {
			render(<ComponentOutsideProvider />)
		}).toThrow('useArtistContext must be used within an ArtistProvider')

		consoleSpy.mockRestore()
	})
})
