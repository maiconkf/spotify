import { Users, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArtistCardProps } from '@/types'
import { useTranslations } from '@/hooks/useTranslations'
import { useI18n } from '@/hooks/useI18n'

export default function ArtistCard({ artist }: ArtistCardProps) {
	const { t } = useTranslations()
	const { locale } = useI18n()
	const router = useRouter()
	const searchParams = useSearchParams()
	const imageUrl =
		artist.images[0]?.url ??
		`https://placehold.co/640x640?text=${encodeURIComponent(artist.name)}`

	const browserLocale = locale === 'pt-BR' ? 'pt-BR' : 'en-US'
	const followersCount = artist.followers.total.toLocaleString(browserLocale)

	const handleOpenSpotifyLink = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		window.open(artist.external_urls.spotify, '_blank')
	}

	const handleCardClick = () => {
		const query = searchParams.get('q')
		const page = searchParams.get('page') || '1'
		const type = searchParams.get('type') || 'artist'

		if (query) {
			const searchState = {
				query,
				page,
				type,
			}
			sessionStorage.setItem('searchState', JSON.stringify(searchState))
		}

		router.push(`/${locale}/artist/${artist.id}`)
	}

	return (
		<div
			onClick={handleCardClick}
			className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-gray-200 cursor-pointer"
		>
			<div className="p-4">
				<div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
					<Image
						src={imageUrl}
						alt={artist.name}
						fill
						className="object-cover transition-transform hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
						onError={e => {
							;(e.target as HTMLImageElement).src =
								'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNjBMMTQwIDEwMEgxMjBWMTQwSDgwVjEwMEg2MEwxMDAgNjBaIiBmaWxsPSIjOUI5Qjk5Ii8+Cjwvc3ZnPgo='
						}}
					/>
				</div>

				<h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
					{artist.name}
				</h3>

				<div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
					<div className="flex items-center gap-1">
						<Users className="h-4 w-4" />
						<span>{t('artist.followers', { count: followersCount })}</span>
					</div>
					<div className="flex items-center gap-1">
						<div className="w-2 h-2 rounded-full bg-green-500"></div>
						<span>{artist.popularity}/100</span>
					</div>
				</div>

				{artist.genres.length > 0 && (
					<div className="mb-3">
						<div className="flex flex-wrap gap-1">
							{artist.genres.slice(0, 2).map(genre => (
								<span
									key={genre}
									className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
								>
									{genre}
								</span>
							))}
							{artist.genres.length > 2 && (
								<span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
									+{artist.genres.length - 2}
								</span>
							)}
						</div>
					</div>
				)}

				<div className="flex justify-between items-center">
					<button className="px-4 py-2 bg-green-600 hover:bg-green-700 cursor-pointer text-white text-sm rounded-lg transition-colors">
						{t('artist.albums')}
					</button>

					<button
						onClick={handleOpenSpotifyLink}
						className="p-2 text-gray-400 hover:text-green-600 transition-colors cursor-pointer"
					>
						<ExternalLink className="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	)
}
