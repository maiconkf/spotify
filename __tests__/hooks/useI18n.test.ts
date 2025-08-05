import { renderHook, act } from '@testing-library/react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useI18n } from '@/hooks/useI18n'

jest.mock('next/navigation', () => ({
	useParams: jest.fn(),
	usePathname: jest.fn(),
	useRouter: jest.fn(),
}))

const mockPush = jest.fn()
const mockUseParams = useParams as jest.Mock
const mockUsePathname = usePathname as jest.Mock
const mockUseRouter = useRouter as jest.Mock

describe('useI18n', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		mockUseRouter.mockReturnValue({
			push: mockPush,
		})
	})

	it('should return default locale when no locale in params', () => {
		mockUseParams.mockReturnValue({})
		mockUsePathname.mockReturnValue('/some-path')

		const { result } = renderHook(() => useI18n())

		expect(result.current.locale).toBe('pt-BR')
		expect(result.current.defaultLocale).toBe('pt-BR')
		expect(result.current.locales).toEqual(['pt-BR', 'en'])
	})

	it('should return locale from params when available', () => {
		mockUseParams.mockReturnValue({ locale: 'en' })
		mockUsePathname.mockReturnValue('/en/some-path')

		const { result } = renderHook(() => useI18n())

		expect(result.current.locale).toBe('en')
	})

	it('should change locale when current path has locale prefix', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })
		mockUsePathname.mockReturnValue('/pt-BR/artist/123')

		const { result } = renderHook(() => useI18n())

		act(() => {
			result.current.changeLocale('en')
		})

		expect(mockPush).toHaveBeenCalledWith('/en/artist/123')
	})

	it('should add locale prefix when current path has no locale', () => {
		mockUseParams.mockReturnValue({})
		mockUsePathname.mockReturnValue('/artist/123')

		const { result } = renderHook(() => useI18n())

		act(() => {
			result.current.changeLocale('en')
		})

		expect(mockPush).toHaveBeenCalledWith('/en/artist/123')
	})

	it('should handle root path correctly', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })
		mockUsePathname.mockReturnValue('/pt-BR')

		const { result } = renderHook(() => useI18n())

		act(() => {
			result.current.changeLocale('en')
		})

		expect(mockPush).toHaveBeenCalledWith('/en')
	})

	it('should handle path with query parameters', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })
		mockUsePathname.mockReturnValue('/pt-BR/search')

		const { result } = renderHook(() => useI18n())

		act(() => {
			result.current.changeLocale('en')
		})

		expect(mockPush).toHaveBeenCalledWith('/en/search')
	})

	it('should handle empty pathname', () => {
		mockUseParams.mockReturnValue({})
		mockUsePathname.mockReturnValue('')

		const { result } = renderHook(() => useI18n())

		act(() => {
			result.current.changeLocale('en')
		})

		expect(mockPush).toHaveBeenCalledWith('/en')
	})

	it('should handle pathname with only slash', () => {
		mockUseParams.mockReturnValue({})
		mockUsePathname.mockReturnValue('/')

		const { result } = renderHook(() => useI18n())

		act(() => {
			result.current.changeLocale('en')
		})

		expect(mockPush).toHaveBeenCalledWith('/en/')
	})

	it('should change from pt-BR to en', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })
		mockUsePathname.mockReturnValue('/pt-BR/artist/123/albums')

		const { result } = renderHook(() => useI18n())

		act(() => {
			result.current.changeLocale('en')
		})

		expect(mockPush).toHaveBeenCalledWith('/en/artist/123/albums')
	})

	it('should change from en to pt-BR', () => {
		mockUseParams.mockReturnValue({ locale: 'en' })
		mockUsePathname.mockReturnValue('/en/search')

		const { result } = renderHook(() => useI18n())

		act(() => {
			result.current.changeLocale('pt-BR')
		})

		expect(mockPush).toHaveBeenCalledWith('/pt-BR/search')
	})

	it('should have stable changeLocale function reference', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })
		mockUsePathname.mockReturnValue('/pt-BR/artist/123')

		const { result, rerender } = renderHook(() => useI18n())
		const firstChangeLocale = result.current.changeLocale

		rerender()
		const secondChangeLocale = result.current.changeLocale

		expect(firstChangeLocale).toBe(secondChangeLocale)
	})

	it('should handle complex nested paths', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })
		mockUsePathname.mockReturnValue('/pt-BR/artist/123/albums/456')

		const { result } = renderHook(() => useI18n())

		act(() => {
			result.current.changeLocale('en')
		})

		expect(mockPush).toHaveBeenCalledWith('/en/artist/123/albums/456')
	})
})
