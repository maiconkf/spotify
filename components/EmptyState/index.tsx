import { Music } from 'lucide-react'
import { EmptyStateProps } from '@/types'

export default function EmptyState({ searchType, type }: EmptyStateProps) {
	if (type === 'welcome') {
		return (
			<div className="text-center py-16">
				<Music className="h-20 w-20 text-green-600 mx-auto mb-6" />
				<h2 className="text-2xl font-bold text-gray-900 mb-4">
					Descubra Artistas e Álbuns
				</h2>
				<p className="text-gray-600 mb-8 max-w-md mx-auto">
					Use a barra de pesquisa acima para encontrar seus artistas favoritos e
					explorar seus álbuns no Spotify.
				</p>
			</div>
		)
	}

	if (type === 'no-results') {
		return (
			<div className="text-center py-12">
				<Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
				<h3 className="text-lg font-semibold text-gray-900 mb-2">
					Nenhum {searchType === 'artist' ? 'artista' : 'álbum'} encontrado
				</h3>
				<p className="text-gray-600">
					Tente buscar com um termo diferente ou verifique a ortografia.
				</p>
			</div>
		)
	}

	return null
}
