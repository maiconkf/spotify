import axios from 'axios'
import { SpotifyTokenResponse, StoredToken } from '@/types'

let token: StoredToken | null = null

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || ''
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || ''

const isTokenValid = (): boolean => {
	if (!token) return false

	const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000
	return token.expires_at > fiveMinutesFromNow
}

const fetchNewToken = async (): Promise<StoredToken> => {
	try {
		const response = await axios.post<SpotifyTokenResponse>(
			'https://accounts.spotify.com/api/token',
			new URLSearchParams({
				grant_type: 'client_credentials',
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
			}),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}
		)

		const { access_token, token_type, expires_in } = response.data

		const expires_at = Date.now() + expires_in * 1000

		return {
			access_token,
			token_type,
			expires_at,
		}
	} catch (error) {
		console.error('Erro ao obter token do Spotify:', error)
		throw new Error('Falha na autenticação com o Spotify')
	}
}

export const getValidToken = async (): Promise<string> => {
	if (!isTokenValid()) {
		token = await fetchNewToken()
	}

	return token!.access_token
}

export const getAuthHeaders = async (): Promise<Record<string, string>> => {
	const accessToken = await getValidToken()
	return {
		Authorization: `Bearer ${accessToken}`,
		'Content-Type': 'application/json',
	}
}

export const clearToken = (): void => {
	token = null
}
