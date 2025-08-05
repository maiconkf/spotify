import { renderHook, act } from '@testing-library/react'
import { useProgrammaticScroll } from '@/hooks/useProgrammaticScroll'

describe('useProgrammaticScroll', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should initialize with isProgrammaticScroll as false', () => {
		const { result } = renderHook(() => useProgrammaticScroll())

		expect(result.current.isProgrammaticScroll).toBe(false)
	})

	it('should set isProgrammaticScroll to true when startProgrammaticScroll is called', () => {
		const { result } = renderHook(() => useProgrammaticScroll())

		act(() => {
			result.current.startProgrammaticScroll()
		})

		expect(result.current.isProgrammaticScroll).toBe(true)
	})

	it('should reset isProgrammaticScroll to false after timeout', async () => {
		jest.useFakeTimers()

		const { result } = renderHook(() => useProgrammaticScroll())

		act(() => {
			result.current.startProgrammaticScroll()
		})

		expect(result.current.isProgrammaticScroll).toBe(true)

		act(() => {
			jest.advanceTimersByTime(1000)
		})

		expect(result.current.isProgrammaticScroll).toBe(false)

		jest.useRealTimers()
	})

	it('should clear timeout when component unmounts', () => {
		jest.useFakeTimers()

		const { result, unmount } = renderHook(() => useProgrammaticScroll())

		act(() => {
			result.current.startProgrammaticScroll()
		})

		expect(result.current.isProgrammaticScroll).toBe(true)

		unmount()

		jest.advanceTimersByTime(1000)

		expect(result.current.isProgrammaticScroll).toBe(true)

		jest.useRealTimers()
	})

	it('should handle multiple calls to startProgrammaticScroll', () => {
		jest.useFakeTimers()

		const { result } = renderHook(() => useProgrammaticScroll())

		act(() => {
			result.current.startProgrammaticScroll()
		})

		expect(result.current.isProgrammaticScroll).toBe(true)

		act(() => {
			result.current.startProgrammaticScroll()
		})

		expect(result.current.isProgrammaticScroll).toBe(true)

		act(() => {
			jest.advanceTimersByTime(1000)
		})

		expect(result.current.isProgrammaticScroll).toBe(false)

		jest.useRealTimers()
	})
})
