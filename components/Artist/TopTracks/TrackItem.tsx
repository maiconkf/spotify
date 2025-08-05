'use client'

import { Play, Clock, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { TrackItemProps } from '@/types/components'
import { useTranslations } from '@/hooks/useTranslations'

function formatDuration(ms: number): string {
	const minutes = Math.floor(ms / 60000)
	const seconds = Math.floor((ms % 60000) / 1000)
	return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function TrackItem({ track, index }: TrackItemProps) {
	const { t } = useTranslations()
	const albumImage = track.album.images[0]?.url

	const handleTrackClick = () => {
		window.open(track.external_urls.spotify, '_blank', 'noopener,noreferrer')
	}

	return (
		<div
			className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
			onClick={handleTrackClick}
		>
			<div className="flex-shrink-0 w-8 text-center">
				<span className="text-gray-500 group-hover:hidden">{index + 1}</span>
				<Play className="h-4 w-4 text-green-600 hidden group-hover:block mx-auto" />
			</div>

			{albumImage && (
				<div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100 flex-shrink-0">
					<Image
						src={albumImage}
						alt={track.album.name}
						fill
						className="object-cover"
						sizes="48px"
					/>
				</div>
			)}

			<div className="flex-1 min-w-0">
				<h4 className="font-medium text-gray-900 truncate">{track.name}</h4>
				<p className="text-sm text-gray-600 truncate">
					{track.artists.map(artist => artist.name).join(', ')}
				</p>
			</div>

			<div className="flex items-center gap-3 text-sm text-gray-500">
				<div className="flex items-center gap-1">
					<Clock className="h-3 w-3" />
					<span>{formatDuration(track.duration_ms)}</span>
				</div>

				<div
					className="p-1 text-gray-400 hover:text-green-600 transition-colors opacity-0 group-hover:opacity-100"
					onClick={e => {
						e.stopPropagation()
						handleTrackClick()
					}}
					title={t('artistProfile.openOnSpotify')}
				>
					<ExternalLink className="h-4 w-4" />
				</div>
			</div>
		</div>
	)
}
