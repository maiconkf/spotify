import { tokenize, getNestedValue, translate } from '@/lib/i18n'
import type { TranslationTokens } from '@/lib/i18n'

describe('I18n System', () => {
	describe('tokenize', () => {
		it('should replace tokens in template string', () => {
			const template = 'Hello {{name}}, you have {{count}} messages'
			const tokens = { name: 'John', count: 5 }

			const result = tokenize(template, tokens)

			expect(result).toBe('Hello John, you have 5 messages')
		})

		it('should handle missing tokens by keeping placeholder', () => {
			const template = 'Hello {{name}}, you have {{count}} messages'
			const tokens = { name: 'John' }

			const result = tokenize(template, tokens)

			expect(result).toBe('Hello John, you have {{count}} messages')
		})

		it('should handle empty tokens object', () => {
			const template = 'Hello {{name}}'

			const result = tokenize(template)

			expect(result).toBe('Hello {{name}}')
		})

		it('should handle string with no tokens', () => {
			const template = 'Hello world'
			const tokens = { name: 'John' }

			const result = tokenize(template, tokens)

			expect(result).toBe('Hello world')
		})

		it('should handle numeric tokens', () => {
			const template = 'Page {{page}} of {{total}}'
			const tokens = { page: 1, total: 10 }

			const result = tokenize(template, tokens)

			expect(result).toBe('Page 1 of 10')
		})
	})

	describe('getNestedValue', () => {
		const translations: TranslationTokens = {
			search: {
				placeholder: 'Digite sua busca...',
				button: 'Buscar',
				results: {
					found: 'Encontrados {{count}} resultados',
				},
			},
			simple: 'Valor simples',
		}

		it('should get simple nested value', () => {
			const result = getNestedValue(translations, 'search.placeholder')
			expect(result).toBe('Digite sua busca...')
		})

		it('should get deeply nested value', () => {
			const result = getNestedValue(translations, 'search.results.found')
			expect(result).toBe('Encontrados {{count}} resultados')
		})

		it('should get root level value', () => {
			const result = getNestedValue(translations, 'simple')
			expect(result).toBe('Valor simples')
		})

		it('should return undefined for non-existent path', () => {
			const result = getNestedValue(translations, 'nonexistent.path')
			expect(result).toBeUndefined()
		})

		it('should return undefined for partial path', () => {
			const result = getNestedValue(translations, 'search.nonexistent')
			expect(result).toBeUndefined()
		})
	})

	describe('translate', () => {
		const translations = {
			'pt-br': {
				search: {
					placeholder: 'Digite sua busca...',
					results: 'Encontrados {{count}} resultados para "{{query}}"',
				},
				welcome: 'Bem-vindo!',
			},
			en: {
				search: {
					placeholder: 'Type your search...',
					results: 'Found {{count}} results for "{{query}}"',
				},
				welcome: 'Welcome!',
			},
		}

		it('should translate simple key', () => {
			const result = translate('welcome', 'pt-br', translations)
			expect(result).toBe('Bem-vindo!')
		})

		it('should translate nested key', () => {
			const result = translate('search.placeholder', 'en', translations)
			expect(result).toBe('Type your search...')
		})

		it('should translate with tokens', () => {
			const result = translate('search.results', 'pt-br', translations, {
				count: 5,
				query: 'Beatles',
			})
			expect(result).toBe('Encontrados 5 resultados para "Beatles"')
		})

		it('should return key when language not found', () => {
			const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

			const result = translate(
				'welcome',
				'fr' as keyof typeof translations,
				translations
			)

			expect(result).toBe('welcome')
			expect(consoleSpy).toHaveBeenCalledWith(
				"Language 'fr' not found in translations"
			)

			consoleSpy.mockRestore()
		})

		it('should return key when translation not found', () => {
			const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

			const result = translate('nonexistent', 'pt-br', translations)

			expect(result).toBe('nonexistent')
			expect(consoleSpy).toHaveBeenCalledWith(
				"Translation key 'nonexistent' not found for language 'pt-br'"
			)

			consoleSpy.mockRestore()
		})

		it('should handle partial token replacement', () => {
			const result = translate('search.results', 'en', translations, {
				count: 3,
			})
			expect(result).toBe('Found 3 results for "{{query}}"')
		})
	})
})
