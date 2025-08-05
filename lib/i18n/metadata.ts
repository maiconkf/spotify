import { Metadata } from 'next'
import { translationConfig } from './config'
import { Language, TranslationTokens } from './index'
import { MetadataOptions } from '@/types/i18n'

export function generateI18nMetadata(options: MetadataOptions): Metadata {
	const { locale = 'pt-BR', alternateLanguages = true } = options
	const normalizedLocale = locale === 'pt-BR' ? 'pt-br' : locale
	const translations =
		translationConfig.translations[normalizedLocale as Language]

	if (!translations) {
		return {
			title: options.title || 'Kanastra Spotify App',
			description:
				options.description || 'Search for artists and albums on Spotify',
		}
	}

	const getTranslation = (key: string, fallback: string): string => {
		const keys = key.split('.')
		let value: TranslationTokens | string = translations

		for (const k of keys) {
			if (value && typeof value === 'object') {
				value = value[k] as TranslationTokens | string
			} else {
				return fallback
			}
		}

		return typeof value === 'string' ? value : fallback
	}

	const title =
		options.title || getTranslation('meta.title', 'Kanastra Spotify App')
	const description =
		options.description ||
		getTranslation(
			'meta.description',
			'Search for artists and albums on Spotify'
		)

	const metadata: Metadata = {
		title,
		description,
		openGraph: {
			title,
			description,
			locale: locale,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
		},
	}

	if (alternateLanguages) {
		metadata.alternates = {
			languages: {},
		}

		translationConfig.supportedLanguages.forEach(lang => {
			const nextLocale = lang === 'pt-br' ? 'pt-BR' : lang
			if (metadata.alternates?.languages) {
				metadata.alternates.languages[nextLocale] = `/${nextLocale}`
			}
		})
	}

	return metadata
}

export function generateHreflangLinks(currentPath: string = '') {
	return translationConfig.supportedLanguages.map(lang => {
		const nextLocale = lang === 'pt-br' ? 'pt-BR' : lang
		const hreflang = lang === 'pt-br' ? 'pt-BR' : lang

		return {
			hreflang,
			href: `/${nextLocale}${currentPath}`,
		}
	})
}
