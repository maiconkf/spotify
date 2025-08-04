import { Calendar, ExternalLink, Music } from 'lucide-react'
import Image from 'next/image'
import { AlbumCardProps } from '@/types'

export default function AlbumCard({ album }: AlbumCardProps) {
	const imageUrl =
		album.images[0]?.url ??
		`https://placehold.co/640x640?text=${encodeURIComponent(album.name)}`

	const releaseYear = new Date(album.release_date).getFullYear()
	const artistNames = album.artists.map(artist => artist.name).join(', ')

	const openSpotifyLink = (e: React.MouseEvent) => {
		e.preventDefault()
		window.open(album.external_urls.spotify, '_blank')
	}

	const handleCardClick = () => {
		window.open(album.external_urls.spotify, '_blank')
	}

	const handleButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation() // Previne que o clique no botão acione o clique do card
		openSpotifyLink(e)
	}

	return (
		<div
			className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-gray-200 cursor-pointer"
			onClick={handleCardClick}
		>
			<div className="p-4">
				<div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
					<Image
						src={imageUrl}
						alt={album.name}
						fill
						className="object-cover transition-transform hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
						onError={e => {
							;(e.target as HTMLImageElement).src =
								'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNjBMMTQwIDEwMEgxMjBWMTQwSDgwVjEwMEg2MEwxMDAgNjBaIiBmaWxsPSIjOUI5Qjk5Ii8+Cjwvc3ZnPgo='
						}}
					/>
				</div>

				<h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
					{album.name}
				</h3>

				<p className="text-gray-600 mb-3 line-clamp-1">por {artistNames}</p>

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
					<span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">
						{album.album_type}
					</span>

					<button
						onClick={handleButtonClick}
						className="p-2 text-gray-400 hover:text-green-600 cursor-pointer transition-colors"
						title="Abrir no Spotify"
					>
						<ExternalLink className="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	)
}
