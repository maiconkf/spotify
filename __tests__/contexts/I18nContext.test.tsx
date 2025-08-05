import { render, screen, act, renderHook } from '@testing-library/react'
import { I18nProvider, useI18n } from '@/contexts/I18nContext'
import { Language } from '@/lib/i18n'

const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
})

function TestComponent() {
	const { language, setLanguage, t, supportedLanguages } = useI18n()

	return (
		<div>
			<div data-testid="current-language">{language}</div>
			<div data-testid="supported-languages">
				{supportedLanguages.join(',')}
			</div>
			<button
				data-testid="set-english"
				onClick={() => setLanguage('en' as Language)}
			>
				Set English
			</button>
			<button
				data-testid="set-portuguese"
				onClick={() => setLanguage('pt-BR' as Language)}
			>
				Set Portuguese
			</button>
			<div data-testid="translated-text">{t('search.button')}</div>
			<div data-testid="translated-with-tokens">
				{t('search.results', { query: 'test' })}
			</div>
		</div>
	)
}

describe('I18nContext', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		localStorageMock.getItem.mockReturnValue(null)
	})

	it('should provide default language when no saved language exists', () => {
		localStorageMock.getItem.mockReturnValue(null)

		render(
			<I18nProvider>
				<TestComponent />
			</I18nProvider>
		)

		expect(screen.getByTestId('current-language')).toHaveTextContent('pt-br')
		expect(localStorageMock.getItem).toHaveBeenCalledWith('spotify-language')
	})

	it('should load saved language from localStorage', () => {
		localStorageMock.getItem.mockReturnValue('en')

		render(
			<I18nProvider>
				<TestComponent />
			</I18nProvider>
		)

		expect(screen.getByTestId('current-language')).toHaveTextContent('en')
	})

	it('should ignore invalid saved language from localStorage', () => {
		localStorageMock.getItem.mockReturnValue('invalid-lang')

		render(
			<I18nProvider>
				<TestComponent />
			</I18nProvider>
		)

		expect(screen.getByTestId('current-language')).toHaveTextContent('pt-br')
	})

	it('should change language and save to localStorage', () => {
		render(
			<I18nProvider>
				<TestComponent />
			</I18nProvider>
		)

		act(() => {
			screen.getByTestId('set-english').click()
		})

		expect(screen.getByTestId('current-language')).toHaveTextContent('en')
		expect(localStorageMock.setItem).toHaveBeenCalledWith(
			'spotify-language',
			'en'
		)
	})

	it('should provide supported languages', () => {
		render(
			<I18nProvider>
				<TestComponent />
			</I18nProvider>
		)

		const supportedLanguages = screen.getByTestId(
			'supported-languages'
		).textContent
		expect(supportedLanguages).toContain('en')
		expect(supportedLanguages).toContain('pt-br')
	})

	it('should translate text using t function', () => {
		render(
			<I18nProvider>
				<TestComponent />
			</I18nProvider>
		)

		const translatedText = screen.getByTestId('translated-text')
		expect(translatedText).toBeInTheDocument()
		expect(translatedText.textContent).toBeTruthy()
	})

	it('should translate text with tokens', () => {
		render(
			<I18nProvider>
				<TestComponent />
			</I18nProvider>
		)

		const translatedWithTokens = screen.getByTestId('translated-with-tokens')
		expect(translatedWithTokens).toBeInTheDocument()
		expect(translatedWithTokens.textContent).toBeTruthy()
	})

	it('should change translations when language changes', () => {
		render(
			<I18nProvider>
				<TestComponent />
			</I18nProvider>
		)

		act(() => {
			screen.getByTestId('set-english').click()
		})

		const newText = screen.getByTestId('translated-text').textContent
		expect(newText).toBeTruthy()
	})

	it('should throw error when useI18n is used outside provider', () => {
		function ComponentOutsideProvider() {
			useI18n()
			return <div>Should not render</div>
		}

		const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

		expect(() => {
			render(<ComponentOutsideProvider />)
		}).toThrow('useI18n must be used within an I18nProvider')

		consoleSpy.mockRestore()
	})

	it('should handle renderHook pattern', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<I18nProvider>{children}</I18nProvider>
		)

		const { result } = renderHook(() => useI18n(), { wrapper })

		expect(result.current.language).toBe('pt-br')
		expect(Array.isArray(result.current.supportedLanguages)).toBe(true)
		expect(typeof result.current.t).toBe('function')
		expect(typeof result.current.setLanguage).toBe('function')
	})
})
