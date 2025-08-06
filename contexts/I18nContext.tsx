'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translate as translateText } from '@/lib/i18n'
import { translationConfig } from '@/lib/i18n/config'
import { I18nContextType, I18nProviderProps, Language } from '@/types/i18n'

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: I18nProviderProps) {
	const [language, setLanguageState] = useState<Language>(
		translationConfig.defaultLanguage
	)

	useEffect(() => {
		const savedLanguage = localStorage.getItem('spotify-language') as Language
		if (
			savedLanguage &&
			translationConfig.supportedLanguages.includes(savedLanguage)
		) {
			setLanguageState(savedLanguage)
		}
	}, [])

	const setLanguage = (newLanguage: Language) => {
		setLanguageState(newLanguage)
		localStorage.setItem('spotify-language', newLanguage)
	}

	const t = (key: string, tokens?: Record<string, string | number>) => {
		return translateText(key, language, translationConfig.translations, tokens)
	}

	const value: I18nContextType = {
		language,
		setLanguage,
		t,
		supportedLanguages: translationConfig.supportedLanguages,
	}

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
	const context = useContext(I18nContext)
	if (context === undefined) {
		throw new Error('useI18n must be used within an I18nProvider')
	}
	return context
}
