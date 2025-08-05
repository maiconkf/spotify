'use client'

import { useI18n, type Locale } from '@/hooks/useI18n'

export default function LanguageSwitcher() {
	const { locale, changeLocale } = useI18n()

	const handleLanguageChange = (newLocale: Locale) => {
		changeLocale(newLocale)
	}

	return (
		<div className="flex items-center gap-1 text-sm text-gray-600">
			<button
				onClick={() => handleLanguageChange('pt-BR')}
				className={`px-2 py-1 rounded transition-colors ${
					locale === 'pt-BR'
						? 'bg-green-600 text-white'
						: 'hover:bg-gray-100 cursor-pointer'
				}`}
			>
				PT-BR
			</button>
			<span className="text-gray-400">|</span>
			<button
				onClick={() => handleLanguageChange('en')}
				className={`px-2 py-1 rounded transition-colors ${
					locale === 'en'
						? 'bg-green-600 text-white'
						: 'hover:bg-gray-100 cursor-pointer'
				}`}
			>
				EN
			</button>
		</div>
	)
}
