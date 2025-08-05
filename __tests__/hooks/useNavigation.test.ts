import { renderHook } from '@testing-library/react'
import { useNavigation } from '@/hooks/useNavigation'

const mockReplace = jest.fn()
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		replace: mockReplace,
	}),
	useParams: () => ({
		locale: 'pt-BR',
	}),
}))

describe('useNavigation', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	describe('updateURL', () => {
		it('should update URL with search parameters', () => {
			const { result } = renderHook(() => useNavigation())

			result.current.updateURL({
				query: 'Beatles',
				page: 2,
				type: 'artist',
			})

			expect(mockReplace).toHaveBeenCalledWith(
				'/pt-BR?q=Beatles&page=2&type=artist'
			)
		})

		it('should handle empty query by navigating to home', () => {
			const { result } = renderHook(() => useNavigation())

			result.current.updateURL({
				query: '',
				page: 1,
				type: 'artist',
			})

			expect(mockReplace).toHaveBeenCalledWith('/pt-BR')
		})

		it('should handle album search type', () => {
			const { result } = renderHook(() => useNavigation())

			result.current.updateURL({
				query: 'Abbey Road',
				page: 1,
				type: 'album',
			})

			expect(mockReplace).toHaveBeenCalledWith(
				'/pt-BR?q=Abbey+Road&page=1&type=album'
			)
		})

		it('should handle special characters in query', () => {
			const { result } = renderHook(() => useNavigation())

			result.current.updateURL({
				query: 'AC/DC & Friends',
				page: 1,
				type: 'artist',
			})

			expect(mockReplace).toHaveBeenCalledWith(
				'/pt-BR?q=AC%2FDC+%26+Friends&page=1&type=artist'
			)
		})
	})

	describe('goHome', () => {
		it('should navigate to home page', () => {
			const { result } = renderHook(() => useNavigation())

			result.current.goHome()

			expect(mockReplace).toHaveBeenCalledWith('/pt-BR')
		})
	})
})
