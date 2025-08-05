'use client'

import { Music } from 'lucide-react'
import { SimpleAlbumsListProps } from '@/types'
import AlbumCard from '@/components/Album/Card'

export default function AlbumsList({ albums }: SimpleAlbumsListProps) {
	if (albums.length === 0) {
		return (
			<div className="text-center py-12">
				<Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
				<h3 className="text-xl font-semibold text-gray-900 mb-2">
					Nenhum álbum encontrado
				</h3>
				<p className="text-gray-600">
					Este artista não possui álbuns disponíveis no momento.
				</p>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{albums.map(album => (
				<AlbumCard key={album.id} album={album} />
			))}
		</div>
	)
}
