'use client'

import { Calendar, Music, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { SimpleAlbumsListProps } from '@/types'

export default function SimpleAlbumsList({ albums }: SimpleAlbumsListProps) {
	const handleCardClick = (spotifyUrl: string) => {
		window.open(spotifyUrl, '_blank')
	}

	const handleLinkClick = (e: React.MouseEvent) => {
		e.stopPropagation() // Previne que o clique no link acione o clique do card
	}

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
			{albums.map(album => {
				const imageUrl = album.images[0]?.url
				const releaseYear = new Date(album.release_date).getFullYear()

				return (
					<a
						href={album.external_urls.spotify}
						rel="noopener noreferrer"
						title="Abrir no Spotify"
						target="_blank"
						key={album.id}
						className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
					>
						<div className="p-4">
							{imageUrl && (
								<div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
									<Image
										src={imageUrl}
										alt={album.name}
										fill
										className="object-cover transition-transform hover:scale-105"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
									/>
								</div>
							)}

							<h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
								{album.name}
							</h3>

							<div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
								<div className="flex items-center gap-1">
									<Calendar className="h-4 w-4" />
									<span>{releaseYear}</span>
								</div>
								<div className="flex items-center gap-1">
									<Music className="h-4 w-4" />
									<span>{album.total_tracks} faixas</span>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full capitalize">
									{album.album_type}
								</span>

								<button
									onClick={handleLinkClick}
									className="p-2 text-gray-400 hover:text-green-600 transition-colors"
									title="Abrir no Spotify"
								>
									<ExternalLink className="h-4 w-4" />
								</button>
							</div>
						</div>
					</a>
				)
			})}
		</div>
	)
}
