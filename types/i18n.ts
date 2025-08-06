import { ReactNode } from 'react'
import { TranslationTokens } from '@/lib/i18n'

export type Language = 'pt-br' | 'en'
export type Locale = 'pt-BR' | 'en'

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
