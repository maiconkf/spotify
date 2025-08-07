import { Metadata } from 'next'
import { ArtistLayoutProps } from '@/types/layouts'
import api from '@/config/api'

async function getArtistData(artistId: string) {
	try {
		const response = await api.get(`/v1/artists/${artistId}`)
		return response.data
	} catch (error) {
		console.error('Error fetching artist data:', error)
		return null
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string; locale: string }>
}): Promise<Metadata> {
	try {
		const { id } = await params
		const artistData = await getArtistData(id)

		if (artistData) {
			return {
				title: `${artistData.name} - Página do Artista | Kanastra Spotify`,
				description: `Descubra mais sobre ${artistData.name}. Ouça suas principais músicas e explore seus álbuns no Spotify.`,
				openGraph: {
					title: `${artistData.name} - Página do Artista`,
					description: `Descubra mais sobre ${artistData.name}. Ouça suas principais músicas e explore seus álbuns no Spotify.`,
					images: artistData.images?.[0]?.url ? [artistData.images[0].url] : [],
				},
			}
		}
	} catch {
		// Error handling - return default metadata
	}

	return {
		title: 'Página do Artista | Kanastra Spotify',
		description: 'Descubra mais sobre este artista no Spotify.',
	}
}

export default function ArtistLayout({ children }: ArtistLayoutProps) {
	return <>{children}</>
}
