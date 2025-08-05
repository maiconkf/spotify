import { renderHook } from '@testing-library/react'
import { useSearchParams } from 'next/navigation'
import { useUrlInitialization } from '@/hooks/useUrlInitialization'

jest.mock('next/navigation', () => ({
	useSearchParams: jest.fn(),
}))

const mockGet = jest.fn()
const mockHandleSearch = jest.fn()
const mockHandlePageChange = jest.fn()
const mockHandleTypeChange = jest.fn()

describe('useUrlInitialization', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		;(useSearchParams as jest.Mock).mockReturnValue({
			get: mockGet,
		})
	})

	const defaultProps = {
		handleSearch: mockHandleSearch,
		handlePageChange: mockHandlePageChange,
		handleTypeChange: mockHandleTypeChange,
	}

	it('should initialize without crashing', () => {
		mockGet.mockReturnValue(null)

		const { result } = renderHook(() => useUrlInitialization(defaultProps))

		expect(result.current).toBeDefined()
		expect(result.current.isInitialized).toBe(true)
	})

	it('should handle search query from URL', () => {
		mockGet.mockImplementation(param => {
			if (param === 'q') return 'test%20query'
			if (param === 'type') return 'artist'
			return null
		})

		renderHook(() => useUrlInitialization(defaultProps))

		expect(mockHandleSearch).toHaveBeenCalledWith('test query')
		expect(mockHandleTypeChange).toHaveBeenCalledWith('artist')
	})

	it('should handle album search type from URL', () => {
		mockGet.mockImplementation(param => {
			if (param === 'q') return 'test'
			if (param === 'type') return 'album'
			return null
		})

		renderHook(() => useUrlInitialization(defaultProps))

		expect(mockHandleSearch).toHaveBeenCalledWith('test')
		expect(mockHandleTypeChange).toHaveBeenCalledWith('album')
	})

	it('should handle page parameter from URL', () => {
		mockGet.mockImplementation(param => {
			if (param === 'q') return 'test'
			if (param === 'type') return 'artist'
			if (param === 'page') return '2'
			return null
		})

		renderHook(() => useUrlInitialization(defaultProps))

		expect(mockHandleSearch).toHaveBeenCalledWith('test')
		expect(mockHandlePageChange).toHaveBeenCalledWith(2)
	})

	it('should not change page for page 1', () => {
		mockGet.mockImplementation(param => {
			if (param === 'q') return 'test'
			if (param === 'page') return '1'
			return null
		})

		renderHook(() => useUrlInitialization(defaultProps))

		expect(mockHandleSearch).toHaveBeenCalledWith('test')
		expect(mockHandlePageChange).not.toHaveBeenCalled()
	})

	it('should handle missing search parameters', () => {
		mockGet.mockReturnValue(null)

		const { result } = renderHook(() => useUrlInitialization(defaultProps))

		expect(mockHandleSearch).not.toHaveBeenCalled()
		expect(result.current.isInitialized).toBe(true)
	})

	it('should decode URI components', () => {
		mockGet.mockImplementation(param => {
			if (param === 'q') return 'hello%20world'
			return null
		})

		renderHook(() => useUrlInitialization(defaultProps))

		expect(mockHandleSearch).toHaveBeenCalledWith('hello world')
	})

	it('should handle invalid page number', () => {
		mockGet.mockImplementation(param => {
			if (param === 'q') return 'test'
			if (param === 'page') return 'invalid'
			return null
		})

		renderHook(() => useUrlInitialization(defaultProps))

		expect(mockHandleSearch).toHaveBeenCalledWith('test')
		expect(mockHandlePageChange).not.toHaveBeenCalled()
	})

	it('should ignore invalid search types', () => {
		mockGet.mockImplementation(param => {
			if (param === 'q') return 'test'
			if (param === 'type') return 'invalid'
			return null
		})

		renderHook(() => useUrlInitialization(defaultProps))

		expect(mockHandleSearch).toHaveBeenCalledWith('test')
		expect(mockHandleTypeChange).not.toHaveBeenCalled()
	})

	it('should only initialize once', () => {
		mockGet.mockImplementation(param => {
			if (param === 'q') return 'test'
			return null
		})

		const { rerender } = renderHook(() => useUrlInitialization(defaultProps))

		expect(mockHandleSearch).toHaveBeenCalledTimes(1)

		rerender()

		expect(mockHandleSearch).toHaveBeenCalledTimes(1)
	})
})
