import { renderHook } from '@testing-library/react'
import { usePrefetchObserver } from '@/hooks/usePrefetchObserver'

const mockObserve = jest.fn()
const mockUnobserve = jest.fn()
const mockDisconnect = jest.fn()

global.IntersectionObserver = jest.fn().mockImplementation(callback => ({
	observe: mockObserve,
	unobserve: mockUnobserve,
	disconnect: mockDisconnect,
	callback,
}))

describe('usePrefetchObserver', () => {
	let mockPrefetch: jest.Mock

	beforeEach(() => {
		jest.clearAllMocks()
		mockPrefetch = jest.fn()
	})

	const createDefaultProps = () => ({
		searchQuery: 'test query',
		searchType: 'artist' as const,
		artistsData: {
			artists: {
				items: [],
				total: 0,
				limit: 20,
				offset: 0,
			},
		},
		albumsData: {
			albums: {
				items: [],
				total: 0,
				limit: 20,
				offset: 0,
			},
		},
		prefetchNextPage: mockPrefetch,
		isProgrammaticScroll: false,
	})

	it('should initialize with refs', () => {
		const { result } = renderHook(() =>
			usePrefetchObserver(createDefaultProps())
		)

		expect(result.current.artistPaginationRef.current).toBeNull()
		expect(result.current.albumPaginationRef.current).toBeNull()
	})

	it('should not create observer when searchQuery is empty', () => {
		const props = { ...createDefaultProps(), searchQuery: '' }
		renderHook(() => usePrefetchObserver(props))

		expect(global.IntersectionObserver).not.toHaveBeenCalled()
	})

	it('should create observer when searchQuery is provided', () => {
		renderHook(() => usePrefetchObserver(createDefaultProps()))

		expect(global.IntersectionObserver).toHaveBeenCalled()
	})

	it('should return correct ref objects', () => {
		const { result } = renderHook(() =>
			usePrefetchObserver(createDefaultProps())
		)

		expect(result.current).toHaveProperty('artistPaginationRef')
		expect(result.current).toHaveProperty('albumPaginationRef')
		expect(typeof result.current.artistPaginationRef).toBe('object')
		expect(typeof result.current.albumPaginationRef).toBe('object')
	})

	it('should handle changes in search query', () => {
		const { rerender } = renderHook(
			(props: Parameters<typeof usePrefetchObserver>[0]) =>
				usePrefetchObserver(props),
			{ initialProps: createDefaultProps() }
		)

		const newProps = { ...createDefaultProps(), searchQuery: 'new query' }
		rerender(newProps)

		expect(global.IntersectionObserver).toHaveBeenCalledTimes(2)
	})

	it('should handle different search types', () => {
		const albumProps = {
			...createDefaultProps(),
			searchType: 'album' as const,
		}

		const { unmount } = renderHook(() => usePrefetchObserver(albumProps))

		expect(global.IntersectionObserver).toHaveBeenCalled()

		unmount()
	})

	it('should handle programmatic scroll flag', () => {
		const props = { ...createDefaultProps(), isProgrammaticScroll: true }
		renderHook(() => usePrefetchObserver(props))

		expect(global.IntersectionObserver).toHaveBeenCalled()
	})

	it('should create observer with correct options', () => {
		renderHook(() => usePrefetchObserver(createDefaultProps()))

		expect(global.IntersectionObserver).toHaveBeenCalledWith(
			expect.any(Function),
			{
				threshold: 0.5,
				rootMargin: '100px',
			}
		)
	})
})
