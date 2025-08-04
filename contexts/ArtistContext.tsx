'use client'

import { createContext, useContext, useState } from 'react'
import { ArtistContextType, ArtistProviderProps, SpotifyArtist } from '@/types'

const ArtistContext = createContext<ArtistContextType | undefined>(undefined)

export function ArtistProvider({ children }: ArtistProviderProps) {
	const [artists, setArtists] = useState<{ [key: string]: SpotifyArtist }>({})

	const setArtist = (id: string, artist: SpotifyArtist) => {
		setArtists(prev => ({
			...prev,
			[id]: artist,
		}))
	}

	const getArtist = (id: string): SpotifyArtist | undefined => {
		return artists[id]
	}

	const clearAllArtists = () => {
		setArtists({})
	}

	const value: ArtistContextType = {
		artists,
		setArtist,
		getArtist,
		clearAllArtists,
	}

	return (
		<ArtistContext.Provider value={value}>{children}</ArtistContext.Provider>
	)
}

export function useArtistContext() {
	const context = useContext(ArtistContext)
	if (context === undefined) {
		throw new Error('useArtistContext must be used within an ArtistProvider')
	}
	return context
}
