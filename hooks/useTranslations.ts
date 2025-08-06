import { useParams } from 'next/navigation'
import { translationConfig } from '@/lib/i18n/config'
import { TranslationTokens, tokenize } from '@/lib/i18n/index'
import { Language } from '@/types/i18n'

export function useTranslations() {
	const params = useParams()
	const locale = (params?.locale as string) || 'pt-BR'
	const normalizedLocale = locale === 'pt-BR' ? 'pt-br' : locale

	const translations =
		translationConfig.translations[normalizedLocale as Language] ||
		translationConfig.translations[translationConfig.defaultLanguage]

	const t = (key: string, tokens?: Record<string, string | number>): string => {
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

	return { t, locale: normalizedLocale }
}
