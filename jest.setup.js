import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		prefetch: jest.fn(),
		back: jest.fn(),
		forward: jest.fn(),
	}),
	useSearchParams: () => ({
		get: jest.fn(),
	}),
	useParams: () => ({
		locale: 'pt-BR',
	}),
	usePathname: () => '/pt-BR',
}))

process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID = 'test_client_id'
process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET = 'test_client_secret'

Object.defineProperty(window, 'scrollTo', {
	value: jest.fn(),
	writable: true,
})

global.fetch = jest.fn()

afterEach(() => {
	jest.clearAllMocks()
	jest.clearAllTimers()
	if (global.fetch && global.fetch.mockClear) {
		global.fetch.mockClear()
	}
})

afterAll(() => {
	jest.restoreAllMocks()
})
