export interface SpotifyImage {
	height: number
	url: string
	width: number
}

export interface SpotifyArtist {
	id: string
	name: string
	popularity: number
	followers: {
		total: number
	}
	genres: string[]
	images: SpotifyImage[]
	external_urls: {
		spotify: string
	}
}

export interface SpotifyAlbum {
	id: string
	name: string
	album_type: string
	release_date: string
	total_tracks: number
	images: SpotifyImage[]
	artists: Pick<SpotifyArtist, 'id' | 'name'>[]
	external_urls: {
		spotify: string
	}
}

export interface SpotifyTrack {
	id: string
	name: string
	duration_ms: number
	explicit: boolean
	popularity: number
	preview_url: string | null
	track_number: number
	external_urls: {
		spotify: string
	}
	album: Pick<SpotifyAlbum, 'id' | 'name' | 'images'>
	artists: Pick<SpotifyArtist, 'id' | 'name'>[]
}

export interface SpotifySearchResponse {
	artists: {
		items: SpotifyArtist[]
		total: number
		limit: number
		offset: number
	}
}

export interface SpotifyAlbumSearchResponse {
	albums: {
		items: SpotifyAlbum[]
		total: number
		limit: number
		offset: number
	}
}

export interface SpotifyAlbumsResponse {
	items: SpotifyAlbum[]
	total: number
	limit: number
	offset: number
}

export interface SpotifyTopTracksResponse {
	tracks: SpotifyTrack[]
}

export interface SpotifyTokenResponse {
	access_token: string
	token_type: string
	expires_in: number
}
