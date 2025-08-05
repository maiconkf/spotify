'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SpotifyArtist } from '@/types/spotify'
import { useArtistContext } from '@/contexts/ArtistContext'
import {
	useOptimizedArtist,
	useOptimizedArtistAlbums,
} from '@/hooks/useSpotify'

export function useArtistPage(artistId: string) {
	const router = useRouter()
	const params = useParams()
	const locale = (params?.locale as string) || 'pt-BR'
	const { getArtist, setArtist } = useArtistContext()
	const [artistData, setArtistData] = useState<SpotifyArtist | null>(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [shouldScrollToAlbums, setShouldScrollToAlbums] = useState(false)

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
		const savedSearchState =
			typeof window !== 'undefined'
				? sessionStorage.getItem('searchState')
				: null

		if (savedSearchState) {
			try {
				const { query, page, type } = JSON.parse(savedSearchState)
				const urlParams = new URLSearchParams()
				urlParams.set('q', query)
				urlParams.set('page', page.toString())
				urlParams.set('type', type)

				const searchURL = `/${locale}?${urlParams.toString()}`
				router.push(searchURL)
				return
			} catch (error) {
				console.error('Erro ao restaurar estado de pesquisa:', error)
			}
		}

		router.push(`/${locale}`)
	}

	const handleScrollToAlbums = () => {
		const albumsSection = document.getElementById('albums-section')

		if (albumsSection) {
			albumsSection.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		setShouldScrollToAlbums(true)
	}

	useEffect(() => {
		if (albumsData && shouldScrollToAlbums) {
			handleScrollToAlbums()
			setShouldScrollToAlbums(false)
		}
	}, [albumsData, shouldScrollToAlbums])

	const openSpotifyLink = (url: string) => {
		window.open(url, '_blank')
	}

	const goHome = () => {
		router.push(`/${locale}`)
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
