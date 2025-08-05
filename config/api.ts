import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	InternalAxiosRequestConfig,
} from 'axios'
import { getAuthHeaders, clearToken } from '@/lib/spotifyAuth'

const config: AxiosRequestConfig = {
	baseURL: 'https://api.spotify.com/v1',
	headers: {
		'Content-type': 'application/json',
		Accept: 'application/json',
	},
}

const api: AxiosInstance = axios.create(config)

api.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		try {
			const authHeaders = await getAuthHeaders()

			Object.entries(authHeaders).forEach(([key, value]) => {
				config.headers.set(key, value)
			})

			return config
		} catch (error) {
			console.error('Erro ao obter token de autenticação:', error)
			return Promise.reject(error)
		}
	},
	error => {
		return Promise.reject(error)
	}
)

api.interceptors.response.use(
	response => response,
	async error => {
		if (error.response?.status === 401) {
			clearToken()

			try {
				const authHeaders = await getAuthHeaders()
				Object.entries(authHeaders).forEach(([key, value]) => {
					error.config.headers.set(key, value)
				})
				return api.request(error.config)
			} catch (authError) {
				console.error('Erro ao renovar token:', authError)
				return Promise.reject(authError)
			}
		}

		return Promise.reject(error)
	}
)

export default api
