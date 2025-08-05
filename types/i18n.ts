import { ReactNode } from 'react'
import { Language, TranslationTokens } from '@/lib/i18n'

export interface I18nContextType {
	language: Language
	setLanguage: (language: Language) => void
	t: (key: string, tokens?: Record<string, string | number>) => string
	supportedLanguages: Language[]
}

export interface I18nProviderProps {
	children: ReactNode
}

export interface I18nPageProps {
	translations: TranslationTokens
	locale: string
}

export interface MetadataOptions {
	title?: string
	description?: string
	locale?: string
	alternateLanguages?: boolean
}
