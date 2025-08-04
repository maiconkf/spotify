'use client'

import Image from 'next/image'
import { Music, Users, ExternalLink } from 'lucide-react'
import { ArtistProfileProps } from '@/types'

export default function ArtistProfile({
	artist,
	onOpenSpotify,
}: ArtistProfileProps) {
	return (
		<div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
			<div className="p-8">
				<div className="flex flex-col md:flex-row gap-8">
					<div className="flex-shrink-0">
						{artist.images && artist.images.length > 0 ? (
							<div className="relative w-48 h-48 rounded-full overflow-hidden mx-auto md:mx-0">
								<Image
									src={artist.images[0].url}
									alt={artist.name}
									fill
									className="object-cover"
									sizes="192px"
								/>
							</div>
						) : (
							<div className="w-48 h-48 bg-gray-300 rounded-full flex items-center justify-center mx-auto md:mx-0">
								<Music className="h-16 w-16 text-gray-500" />
							</div>
						)}
					</div>

					<div className="flex-1 text-center md:text-left">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							{artist.name}
						</h2>

						<div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
							<div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
								<Users className="h-5 w-5 text-gray-600" />
								<span className="text-gray-700">
									{artist.followers?.total.toLocaleString()} seguidores
								</span>
							</div>
							<div className="bg-green-100 px-4 py-2 rounded-full">
								<span className="text-green-800 font-medium">
									Popularidade: {artist.popularity}/100
								</span>
							</div>
						</div>

						{artist.genres && artist.genres.length > 0 && (
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Gêneros:
								</h3>
								<div className="flex flex-wrap gap-2 justify-center md:justify-start">
									{artist.genres.map((genre, index) => (
										<span
											key={index}
											className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
										>
											{genre}
										</span>
									))}
								</div>
							</div>
						)}

						{artist.external_urls?.spotify && (
							<button
								onClick={() => onOpenSpotify(artist.external_urls.spotify)}
								className="flex items-center gap-2 bg-green-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors mx-auto md:mx-0"
							>
								<ExternalLink className="h-5 w-5" />
								Abrir no Spotify
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
