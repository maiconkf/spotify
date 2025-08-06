import { TranslationTokens } from '@/lib/i18n'

export type Language = 'pt-br' | 'en'
export type Locale = 'pt-BR' | 'en'

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
