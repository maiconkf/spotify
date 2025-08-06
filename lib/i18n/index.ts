import { Language } from '@/types/i18n'

export type { Language }

export interface TranslationTokens {
	[key: string]: string | TranslationTokens
}

export interface TranslationConfig {
	defaultLanguage: Language
	supportedLanguages: Language[]
	translations: Record<Language, TranslationTokens>
}

export function tokenize(
	template: string,
	tokens: Record<string, string | number> = {}
): string {
	return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
		const value = tokens[key]
		return value !== undefined ? String(value) : match
	})
}

export function getNestedValue(
	obj: TranslationTokens,
	path: string
): string | undefined {
	return path
		.split('.')
		.reduce((current: TranslationTokens | string | undefined, key: string) => {
			if (typeof current === 'object' && current !== null) {
				return current[key]
			}
			return undefined
		}, obj) as string | undefined
}

export function translate(
	key: string,
	language: Language,
	translations: Record<Language, TranslationTokens>,
	tokens: Record<string, string | number> = {}
): string {
	const languageTranslations = translations[language]
	if (!languageTranslations) {
		console.warn(`Language '${language}' not found in translations`)
		return key
	}

	const translatedText = getNestedValue(languageTranslations, key)
	if (!translatedText) {
		console.warn(
			`Translation key '${key}' not found for language '${language}'`
		)
		return key
	}

	return tokenize(translatedText, tokens)
}
