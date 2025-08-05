import api from '@/config/api'

jest.mock('axios', () => ({
	create: jest.fn(() => ({
		interceptors: {
			request: { use: jest.fn() },
			response: { use: jest.fn() },
		},
		get: jest.fn(),
		post: jest.fn(),
		put: jest.fn(),
		delete: jest.fn(),
	})),
}))

jest.mock('@/lib/spotifyAuth', () => ({
	getAuthHeaders: jest.fn(() => ({ Authorization: 'Bearer test-token' })),
	clearToken: jest.fn(),
}))

describe('API Configuration', () => {
	it('exports api instance', () => {
		expect(api).toBeDefined()
	})

	it('has required methods', () => {
		expect(api.get).toBeDefined()
		expect(api.post).toBeDefined()
		expect(api.put).toBeDefined()
		expect(api.delete).toBeDefined()
	})

	it('has interceptors configured', () => {
		expect(api.interceptors).toBeDefined()
		expect(api.interceptors.request).toBeDefined()
		expect(api.interceptors.response).toBeDefined()
	})
})
