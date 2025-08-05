import { translationConfig } from './config'
import { TranslationTokens, tokenize, Language } from './index'

export function getI18nStaticProps(locale: string) {
	const normalizedLocale = locale === 'pt-BR' ? 'pt-br' : locale
	const translations =
		translationConfig.translations[normalizedLocale as Language] ||
		translationConfig.translations[translationConfig.defaultLanguage]

	return {
		props: {
			translations,
			locale: normalizedLocale,
		},
	}
}

export function getI18nStaticPaths() {
	return {
		paths: translationConfig.supportedLanguages.map(locale => {
			const nextLocale = locale === 'pt-br' ? 'pt-BR' : locale
			return { params: { locale: nextLocale } }
		}),
		fallback: false,
	}
}

export function getTranslation(
	translations: TranslationTokens,
	key: string,
	tokens?: Record<string, string | number>
): string {
	const keys = key.split('.')
	let value: TranslationTokens | string = translations

	for (const k of keys) {
		if (value && typeof value === 'object') {
			value = value[k] as TranslationTokens | string
		} else {
			return key
		}
	}

	if (typeof value === 'string') {
		return tokens ? tokenize(value, tokens) : value
	}

	return key
}

export function createT(translations: TranslationTokens) {
	return (key: string, tokens?: Record<string, string | number>) =>
		getTranslation(translations, key, tokens)
}
