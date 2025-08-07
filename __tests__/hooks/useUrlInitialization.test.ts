import { renderHook } from '@testing-library/react'
import { useSearchParams } from 'next/navigation'
import { useUrlInitialization } from '@/hooks/useUrlInitialization'
import { useAppState } from '@/contexts/AppStateContext'

jest.mock('next/navigation', () => ({
	useSearchParams: jest.fn(),
}))

jest.mock('@/contexts/AppStateContext', () => ({
	useAppState: jest.fn(),
}))

const mockGet = jest.fn()
const mockSetSearchQuery = jest.fn()
const mockSetCurrentPage = jest.fn()
const mockSetError = jest.fn()
const mockHandleTypeChange = jest.fn()

describe('useUrlInitialization', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		;(useSearchParams as jest.Mock).mockReturnValue({
			get: mockGet,
		})
		;(useAppState as jest.Mock).mockReturnValue({
			actions: {
				setSearchQuery: mockSetSearchQuery,
				setCurrentPage: mockSetCurrentPage,
				setError: mockSetError,
			},
		})
	})

	const defaultProps = {
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

		expect(mockSetSearchQuery).toHaveBeenCalledWith('test query')
		expect(mockSetError).toHaveBeenCalledWith(null)
		expect(mockSetCurrentPage).toHaveBeenCalledWith(1)
		expect(mockHandleTypeChange).toHaveBeenCalledWith('artist')
	})

	it('should handle album search type from URL', () => {
		mockGet.mockImplementation(param => {
			if (param === 'q') return 'test'
			if (param === 'type') return 'album'
			return null
		})

		renderHook(() => useUrlInitialization(defaultProps))

		expect(mockSetSearchQuery).toHaveBeenCalledWith('test')
		expect(mockSetError).toHaveBeenCalledWith(null)
		expect(mockSetCurrentPage).toHaveBeenCalledWith(1)
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

		expect(mockSetSearchQuery).toHaveBeenCalledWith('test')
		expect(mockSetError).toHaveBeenCalledWith(null)
		expect(mockSetCurrentPage).toHaveBeenCalledWith(2)
		expect(mockHandleTypeChange).toHaveBeenCalledWith('artist')
	})

	it('should not change page for page 1', () => {
		mockGet.mockImplementation(param => {
			if (param === 'q') return 'test'
			if (param === 'page') return '1'
			return null
		})

		renderHook(() => useUrlInitialization(defaultProps))

		expect(mockSetSearchQuery).toHaveBeenCalledWith('test')
		expect(mockSetError).toHaveBeenCalledWith(null)
		expect(mockSetCurrentPage).toHaveBeenCalledWith(1)
	})

	it('should handle missing search parameters', () => {
		mockGet.mockReturnValue(null)

		const { result } = renderHook(() => useUrlInitialization(defaultProps))

		expect(mockSetSearchQuery).not.toHaveBeenCalled()
		expect(mockSetCurrentPage).not.toHaveBeenCalled()
		expect(result.current.isInitialized).toBe(true)
	})

	it('should decode URI components', () => {
		mockGet.mockImplementation(param => {
			if (param === 'q') return 'hello%20world'
			return null
		})

		renderHook(() => useUrlInitialization(defaultProps))

		expect(mockSetSearchQuery).toHaveBeenCalledWith('hello world')
		expect(mockSetError).toHaveBeenCalledWith(null)
		expect(mockSetCurrentPage).toHaveBeenCalledWith(1)
	})

	it('should handle invalid page number', () => {
		mockGet.mockImplementation(param => {
			if (param === 'q') return 'test'
			if (param === 'page') return 'invalid'
			return null
		})

		renderHook(() => useUrlInitialization(defaultProps))

		expect(mockSetSearchQuery).toHaveBeenCalledWith('test')
		expect(mockSetError).toHaveBeenCalledWith(null)
		expect(mockSetCurrentPage).toHaveBeenCalledWith(1)
	})

	it('should ignore invalid search types', () => {
		mockGet.mockImplementation(param => {
			if (param === 'q') return 'test'
			if (param === 'type') return 'invalid'
			return null
		})

		renderHook(() => useUrlInitialization(defaultProps))

		expect(mockSetSearchQuery).toHaveBeenCalledWith('test')
		expect(mockSetError).toHaveBeenCalledWith(null)
		expect(mockSetCurrentPage).toHaveBeenCalledWith(1)
		expect(mockHandleTypeChange).not.toHaveBeenCalled()
	})

	it('should only initialize once', () => {
		mockGet.mockImplementation(param => {
			if (param === 'q') return 'test'
			return null
		})

		const { rerender } = renderHook(() => useUrlInitialization(defaultProps))

		expect(mockSetSearchQuery).toHaveBeenCalledTimes(1)

		rerender()

		expect(mockSetSearchQuery).toHaveBeenCalledTimes(1)
	})
})
