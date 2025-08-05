import { ptBr } from './locales/pt-br'
import { en } from './locales/en'
import { TranslationConfig } from './index'

export const translationConfig: TranslationConfig = {
	defaultLanguage: 'pt-br',
	supportedLanguages: ['pt-br', 'en'],
	translations: {
		'pt-br': ptBr,
		en: en,
	},
}
