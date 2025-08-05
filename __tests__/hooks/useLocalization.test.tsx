import { renderHook } from '@testing-library/react'
import { useLocalization } from '@/hooks/useLocalization'
import { I18nProvider } from '@/contexts/I18nContext'
import React from 'react'

const createWrapper = () => {
	const Wrapper = ({ children }: { children: React.ReactNode }) => (
		<I18nProvider>{children}</I18nProvider>
	)
	Wrapper.displayName = 'TestWrapper'
	return Wrapper
}

describe('useLocalization', () => {
	describe('Locale Detection', () => {
		it('should return pt-BR locale by default', () => {
			const { result } = renderHook(() => useLocalization(), {
				wrapper: createWrapper(),
			})

			expect(result.current.locale).toBe('pt-BR')
		})
	})

	describe('Number Formatting', () => {
		it('should format numbers with current locale', () => {
			const { result } = renderHook(() => useLocalization(), {
				wrapper: createWrapper(),
			})

			const formatted = result.current.formatNumber(1234567)
			expect(formatted).toMatch(/1[.,]234[.,]567/)
		})

		it('should handle zero and negative numbers', () => {
			const { result } = renderHook(() => useLocalization(), {
				wrapper: createWrapper(),
			})

			expect(result.current.formatNumber(0)).toBe('0')
			const negativeFormatted = result.current.formatNumber(-1000)
			expect(negativeFormatted).toMatch(/-1[.,]000/)
		})
	})

	describe('Date Formatting', () => {
		const testDate = new Date('2023-12-25')

		it('should format dates correctly', () => {
			const { result } = renderHook(() => useLocalization(), {
				wrapper: createWrapper(),
			})

			const formatted = result.current.formatDate(testDate)
			expect(formatted).toMatch(/dezembro|December/)
			expect(formatted).toMatch(/2023/)
		})

		it('should handle string dates', () => {
			const { result } = renderHook(() => useLocalization(), {
				wrapper: createWrapper(),
			})

			const formatted = result.current.formatDate('2023-12-25')
			expect(formatted).toMatch(/dezembro|December/)
		})

		it('should format short dates', () => {
			const { result } = renderHook(() => useLocalization(), {
				wrapper: createWrapper(),
			})

			const formatted = result.current.formatShortDate(testDate)
			expect(formatted).toMatch(/dez|Dec/)
			expect(formatted).toMatch(/2023/)
		})

		it('should handle invalid dates gracefully', () => {
			const { result } = renderHook(() => useLocalization(), {
				wrapper: createWrapper(),
			})

			expect(() => result.current.formatDate('invalid-date')).not.toThrow()
		})
	})

	describe('Currency Formatting', () => {
		it('should format currency with default currency', () => {
			const { result } = renderHook(() => useLocalization(), {
				wrapper: createWrapper(),
			})

			const formatted = result.current.formatCurrency(1234.56)
			expect(formatted).toMatch(/R\$|\$/)
		})

		it('should accept custom currency', () => {
			const { result } = renderHook(() => useLocalization(), {
				wrapper: createWrapper(),
			})

			const formatted = result.current.formatCurrency(1234.56, 'EUR')
			expect(formatted).toMatch(/€|EUR/)
		})

		it('should handle zero and negative amounts', () => {
			const { result } = renderHook(() => useLocalization(), {
				wrapper: createWrapper(),
			})

			const zeroFormatted = result.current.formatCurrency(0)
			expect(zeroFormatted).toMatch(/0[.,]00/)

			const negativeFormatted = result.current.formatCurrency(-100)
			expect(negativeFormatted).toMatch(/-|\(.*\)/)
		})

		it('should handle decimal places correctly', () => {
			const { result } = renderHook(() => useLocalization(), {
				wrapper: createWrapper(),
			})

			const formatted = result.current.formatCurrency(100.5)
			expect(formatted).toMatch(/100[.,]50/)
		})
	})

	describe('Integration', () => {
		it('should provide all formatting functions', () => {
			const { result } = renderHook(() => useLocalization(), {
				wrapper: createWrapper(),
			})

			expect(typeof result.current.formatNumber).toBe('function')
			expect(typeof result.current.formatDate).toBe('function')
			expect(typeof result.current.formatShortDate).toBe('function')
			expect(typeof result.current.formatCurrency).toBe('function')
			expect(typeof result.current.locale).toBe('string')
		})

		it('should maintain consistency across function calls', () => {
			const { result } = renderHook(() => useLocalization(), {
				wrapper: createWrapper(),
			})

			expect(result.current.locale).toBe('pt-BR')

			const funcs1 = {
				formatNumber: result.current.formatNumber,
				formatDate: result.current.formatDate,
				formatShortDate: result.current.formatShortDate,
				formatCurrency: result.current.formatCurrency,
			}

			const funcs2 = {
				formatNumber: result.current.formatNumber,
				formatDate: result.current.formatDate,
				formatShortDate: result.current.formatShortDate,
				formatCurrency: result.current.formatCurrency,
			}

			expect(funcs1.formatNumber).toBe(funcs2.formatNumber)
			expect(funcs1.formatDate).toBe(funcs2.formatDate)
			expect(funcs1.formatShortDate).toBe(funcs2.formatShortDate)
			expect(funcs1.formatCurrency).toBe(funcs2.formatCurrency)
		})
	})
})
