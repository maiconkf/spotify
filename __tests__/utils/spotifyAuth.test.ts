import { getValidToken, getAuthHeaders, clearToken } from '@/lib/spotifyAuth'
import type { SpotifyTokenResponse } from '@/types'
import axios from 'axios'

jest.mock('axios', () => ({
	post: jest.fn(),
}))

const mockAxios = axios as jest.Mocked<typeof axios>

describe('Spotify Authentication', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		clearToken()

		process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID = 'test_client_id'
		process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET = 'test_client_secret'
	})

	describe('getValidToken', () => {
		const mockTokenResponse: SpotifyTokenResponse = {
			access_token: 'mock_access_token',
			token_type: 'Bearer',
			expires_in: 3600,
		}

		it('should fetch new token when no token exists', async () => {
			mockAxios.post.mockResolvedValueOnce({ data: mockTokenResponse })

			const token = await getValidToken()

			expect(token).toBe('mock_access_token')
			expect(mockAxios.post).toHaveBeenCalledWith(
				'https:
				expect.any(URLSearchParams),
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			)
		})

		it('should return existing token if still valid', async () => {
			mockAxios.post.mockResolvedValueOnce({ data: mockTokenResponse })
			await getValidToken()

			mockAxios.post.mockClear()
			const token = await getValidToken()

			expect(token).toBe('mock_access_token')
			expect(mockAxios.post).not.toHaveBeenCalled()
		})

		it('should fetch new token when current token is expired', async () => {
			const expiredTokenResponse = {
				...mockTokenResponse,
				expires_in: -1,
			}

			mockAxios.post
				.mockResolvedValueOnce({ data: expiredTokenResponse })
				.mockResolvedValueOnce({ data: mockTokenResponse })

			await getValidToken()

			const token = await getValidToken()

			expect(token).toBe('mock_access_token')
			expect(mockAxios.post).toHaveBeenCalledTimes(2)
		})

		it('should throw error when API request fails', async () => {
			const errorMessage = 'Network error'
			mockAxios.post.mockRejectedValueOnce(new Error(errorMessage))

			const consoleSpy = jest
				.spyOn(console, 'error')
				.mockImplementation(() => {})

			await expect(getValidToken()).rejects.toThrow(
				'Falha na autenticação com o Spotify'
			)

			consoleSpy.mockRestore()
		})

		it('should use correct credentials in API request', async () => {
			mockAxios.post.mockResolvedValueOnce({ data: mockTokenResponse })

			await getValidToken()

			const [url, params] = mockAxios.post.mock.calls[0]
			expect(url).toBe('https:

			expect((params as URLSearchParams).get('grant_type')).toBe(
				'client_credentials'
			)
			expect((params as URLSearchParams).get('client_id')).toBe(
				'test_client_id'
			)
			expect((params as URLSearchParams).get('client_secret')).toBe(
				'test_client_secret'
			)
		})
	})

	describe('getAuthHeaders', () => {
		it('should return correct authorization headers', async () => {
			const mockTokenResponse: SpotifyTokenResponse = {
				access_token: 'test_token',
				token_type: 'Bearer',
				expires_in: 3600,
			}

			mockAxios.post.mockResolvedValueOnce({ data: mockTokenResponse })

			const headers = await getAuthHeaders()

			expect(headers).toEqual({
				Authorization: 'Bearer test_token',
				'Content-Type': 'application/json',
			})
		})
	})

	describe('clearToken', () => {
		it('should clear stored token', async () => {
			const mockTokenResponse: SpotifyTokenResponse = {
				access_token: 'test_token',
				token_type: 'Bearer',
				expires_in: 3600,
			}

			mockAxios.post.mockResolvedValueOnce({ data: mockTokenResponse })

			await getValidToken()

			clearToken()

			mockAxios.post.mockResolvedValueOnce({ data: mockTokenResponse })
			await getValidToken()

			expect(mockAxios.post).toHaveBeenCalledTimes(2)
		})
	})
})
