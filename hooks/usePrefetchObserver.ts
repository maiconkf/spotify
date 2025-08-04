import { useEffect, useRef } from 'react'
import { UsePrefetchObserverProps } from '@/types'

export const usePrefetchObserver = ({
	searchQuery,
	searchType,
	artistsData,
	albumsData,
	prefetchNextPage,
	isProgrammaticScroll,
}: UsePrefetchObserverProps) => {
	const artistPaginationRef = useRef<HTMLDivElement>(null)
	const albumPaginationRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!searchQuery) return

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting && !isProgrammaticScroll) {
						prefetchNextPage()
					}
				})
			},
			{
				threshold: 0.5,
				rootMargin: '100px',
			}
		)

		const artistRef = artistPaginationRef.current
		const albumRef = albumPaginationRef.current

		if (artistRef && searchType === 'artist') {
			observer.observe(artistRef)
		}

		if (albumRef && searchType === 'album') {
			observer.observe(albumRef)
		}

		return () => {
			if (artistRef) observer.unobserve(artistRef)
			if (albumRef) observer.unobserve(albumRef)
		}
	}, [
		searchQuery,
		searchType,
		artistsData,
		albumsData,
		prefetchNextPage,
		isProgrammaticScroll,
	])

	return {
		artistPaginationRef,
		albumPaginationRef,
	}
}
