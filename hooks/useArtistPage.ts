'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SpotifyArtist } from '@/types/spotify'
import { useArtistContext } from '@/contexts/ArtistContext'
import {
	useOptimizedArtist,
	useOptimizedArtistAlbums,
} from '@/hooks/useSpotify'

export function useArtistPage(artistId: string) {
	const router = useRouter()
	const { getArtist, setArtist } = useArtistContext()
	const [artistData, setArtistData] = useState<SpotifyArtist | null>(null)
	const [currentPage, setCurrentPage] = useState(1)

	const contextArtist = getArtist(artistId)
	const {
		data: fetchedArtist,
		isLoading: isArtistLoading,
		error: artistError,
	} = useOptimizedArtist(artistId)

	const {
		data: albumsData,
		isLoading: isAlbumsLoading,
		error: albumsError,
	} = useOptimizedArtistAlbums({ artistId, page: currentPage })

	useEffect(() => {
		if (contextArtist) {
			setArtistData(contextArtist)
		} else if (fetchedArtist) {
			setArtistData(fetchedArtist)
			setArtist(artistId, fetchedArtist)
		}

		setCurrentPage(1)
	}, [artistId, contextArtist, fetchedArtist, setArtist])

	const handleBack = () => {
		router.back()
	}

	const handleScrollToAlbums = () => {
		const albumsSection = document.getElementById('albums-section')

		if (albumsSection) {
			albumsSection.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	useEffect(() => {
		if (albumsData) {
			handleScrollToAlbums()
		}
	}, [albumsData])

	const openSpotifyLink = (url: string) => {
		window.open(url, '_blank')
	}

	const goHome = () => {
		router.push('/')
	}

	return {
		artistData,
		albumsData,
		currentPage,
		isArtistLoading,
		isAlbumsLoading,
		artistError,
		albumsError,
		handleBack,
		handlePageChange,
		openSpotifyLink,
		goHome,
	}
}
