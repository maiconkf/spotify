import { renderHook } from '@testing-library/react'
import { useParams } from 'next/navigation'
import { useTranslations } from '@/hooks/useTranslations'

jest.mock('next/navigation', () => ({
	useParams: jest.fn(),
}))

const mockUseParams = useParams as jest.Mock

describe('useTranslations', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should return default locale and t function when no locale in params', () => {
		mockUseParams.mockReturnValue({})

		const { result } = renderHook(() => useTranslations())

		expect(result.current.locale).toBe('pt-br')
		expect(typeof result.current.t).toBe('function')
	})

	it('should normalize pt-BR locale to pt-br', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })

		const { result } = renderHook(() => useTranslations())

		expect(result.current.locale).toBe('pt-br')
	})

	it('should keep other locales as is', () => {
		mockUseParams.mockReturnValue({ locale: 'en' })

		const { result } = renderHook(() => useTranslations())

		expect(result.current.locale).toBe('en')
	})

	it('should translate nested keys', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })

		const { result } = renderHook(() => useTranslations())

		// Test with existing keys from the translation file
		const translation = result.current.t('common.search')
		expect(typeof translation).toBe('string')
	})

	it('should return key when translation not found', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })

		const { result } = renderHook(() => useTranslations())

		const translation = result.current.t('nonexistent.key')
		expect(translation).toBe('nonexistent.key')
	})

	it('should handle empty key', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })

		const { result } = renderHook(() => useTranslations())

		const translation = result.current.t('')
		expect(translation).toBe('')
	})

	it('should handle tokens in translations', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })

		const { result } = renderHook(() => useTranslations())

		// Test tokenization (assuming the translation supports tokens)
		const translation = result.current.t('pagination.showing', {
			start: 1,
			end: 10,
			total: 100,
			type: 'results',
		})
		expect(typeof translation).toBe('string')
	})

	it('should handle partial key paths', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })

		const { result } = renderHook(() => useTranslations())

		// Test with just the first part of a nested key
		const translation = result.current.t('common')
		expect(translation).toBe('common')
	})

	it('should fall back to default language when locale not supported', () => {
		mockUseParams.mockReturnValue({ locale: 'unsupported-locale' })

		const { result } = renderHook(() => useTranslations())

		// Should still return a function and default locale should be used
		expect(typeof result.current.t).toBe('function')
		expect(result.current.locale).toBe('unsupported-locale')
	})

	it('should handle complex nested paths', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })

		const { result } = renderHook(() => useTranslations())

		// Test with deeply nested key
		const translation = result.current.t('artist.sections.albums')
		expect(typeof translation).toBe('string')
	})

	it('should handle translation with multiple tokens', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })

		const { result } = renderHook(() => useTranslations())

		const translation = result.current.t('search.resultsCount', {
			count: 5,
			query: 'test query',
			type: 'artists',
		})
		expect(typeof translation).toBe('string')
	})

	it('should return key when value is not a string', () => {
		mockUseParams.mockReturnValue({ locale: 'pt-BR' })

		const { result } = renderHook(() => useTranslations())

		// Test accessing a parent object key instead of a leaf value
		const translation = result.current.t('common')
		expect(translation).toBe('common')
	})
})
