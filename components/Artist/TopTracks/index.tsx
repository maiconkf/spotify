'use client'

import { useState } from 'react'
import { useOptimizedArtistTopTracks } from '@/hooks/useSpotify'
import { ArtistTopTracksProps } from '@/types/components'
import TrackItem from './TrackItem'
import ShowMoreButton from './ShowMoreButton'
import TopTracksLoading from './TopTracksLoading'
import TopTracksEmptyState from './TopTracksEmptyState'
import { useTranslations } from '@/hooks/useTranslations'

export default function ArtistTopTracks({ artistId }: ArtistTopTracksProps) {
	const [showAll, setShowAll] = useState(false)
	const { t } = useTranslations()
	const {
		data: topTracksData,
		isLoading,
		error,
	} = useOptimizedArtistTopTracks({ artistId })

	if (isLoading) return <TopTracksLoading />

	if (error)
		return <TopTracksEmptyState message={t('error.subtitle')} isError={true} />

	if (!topTracksData?.tracks?.length)
		return <TopTracksEmptyState message={t('artist.noTopTracks')} />

	const tracks = topTracksData.tracks
	const displayedTracks = showAll ? tracks : tracks.slice(0, 5)
	const hasMoreTracks = tracks.length > 5

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<h2 className="text-xl font-bold text-gray-900 mb-4">
				{t('artist.topTracks')}
			</h2>

			<div className="space-y-1 relative">
				<div
					className={`transition-all duration-300 ${
						showAll ? 'max-h-none' : 'max-h-80 overflow-hidden'
					}`}
				>
					{displayedTracks.map((track, index) => (
						<TrackItem key={track.id} track={track} index={index} />
					))}
				</div>

				{!showAll && hasMoreTracks && (
					<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
				)}
			</div>

			<ShowMoreButton
				showAll={showAll}
				onToggle={() => setShowAll(!showAll)}
				hasMoreTracks={hasMoreTracks}
			/>
		</div>
	)
}
