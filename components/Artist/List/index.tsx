'use client'

import { useState } from 'react'
import {
	Calendar,
	Music,
	ExternalLink,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react'
import Image from 'next/image'
import { useOptimizedArtistAlbums } from '@/hooks/useSpotify'
import { AlbumsListProps } from '@/types'

export default function AlbumsList({ artist }: AlbumsListProps) {
	const [currentPage, setCurrentPage] = useState(1)
	const { data, isLoading, error } = useOptimizedArtistAlbums({
		artistId: artist.id,
		page: currentPage,
	})

	if (isLoading) {
		return (
			<div className="mt-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">
					Álbuns de {artist.name}
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{Array.from({ length: 8 }).map((_, i) => (
						<div
							key={i}
							className="bg-white rounded-lg shadow-md p-4 animate-pulse"
						>
							<div className="w-full aspect-square bg-gray-200 rounded-lg mb-4"></div>
							<div className="h-4 bg-gray-200 rounded mb-2"></div>
							<div className="h-3 bg-gray-200 rounded mb-1"></div>
							<div className="h-3 bg-gray-200 rounded w-2/3"></div>
						</div>
					))}
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="mt-8 text-center">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">
					Álbuns de {artist.name}
				</h2>
				<div className="bg-red-50 border border-red-200 rounded-lg p-4">
					<p className="text-red-600">
						Erro ao carregar álbuns. Tente novamente.
					</p>
				</div>
			</div>
		)
	}

	if (!data || data.items.length === 0) {
		return (
			<div className="mt-8 text-center">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">
					Álbuns de {artist.name}
				</h2>
				<div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
					<Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
					<p className="text-gray-600">
						Nenhum álbum encontrado para este artista.
					</p>
				</div>
			</div>
		)
	}

	const totalPages = Math.ceil(data.total / 20)
	const hasNextPage = currentPage < totalPages
	const hasPrevPage = currentPage > 1

	return (
		<div className="mt-8">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold text-gray-900">
					Álbuns de {artist.name}
				</h2>
				<span className="text-sm text-gray-500">
					{data.total} álbuns encontrados
				</span>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
				{data.items.map(album => {
					const imageUrl = album.images[0]?.url
					const releaseYear = new Date(album.release_date).getFullYear()

					return (
						<div
							key={album.id}
							className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
						>
							<div className="p-4">
								{imageUrl && (
									<div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
										<Image
											src={imageUrl}
											alt={album.name}
											className="w-full h-full object-cover transition-transform hover:scale-105"
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

								<div className="flex items-center gap-2 mb-2">
									<span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full capitalize">
										{album.album_type}
									</span>
								</div>

								<div className="flex justify-end">
									<a
										href={album.external_urls.spotify}
										target="_blank"
										rel="noopener noreferrer"
										className="p-2 text-gray-400 hover:text-green-600 transition-colors"
										title="Abrir no Spotify"
									>
										<ExternalLink className="h-4 w-4" />
									</a>
								</div>
							</div>
						</div>
					)
				})}
			</div>

			{totalPages > 1 && (
				<div className="flex items-center justify-center gap-4">
					<button
						onClick={() => setCurrentPage(prev => prev - 1)}
						disabled={!hasPrevPage}
						className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						<ChevronLeft className="h-4 w-4" />
						Anterior
					</button>

					<span className="text-sm text-gray-600">
						Página {currentPage} de {totalPages}
					</span>

					<button
						onClick={() => setCurrentPage(prev => prev + 1)}
						disabled={!hasNextPage}
						className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						Próxima
						<ChevronRight className="h-4 w-4" />
					</button>
				</div>
			)}
		</div>
	)
}
