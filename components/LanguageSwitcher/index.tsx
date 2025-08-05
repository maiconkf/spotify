'use client'

import { useI18n } from '@/contexts/I18nContext'

export default function LanguageSwitcher() {
	const { language, setLanguage } = useI18n()

	const handleLanguageChange = (newLanguage: 'pt-br' | 'en') => {
		setLanguage(newLanguage)
	}

	return (
		<div className="flex items-center gap-1 text-sm text-gray-600">
			<button
				onClick={() => handleLanguageChange('pt-br')}
				className={`px-2 py-1 rounded transition-colors ${
					language === 'pt-br'
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
					language === 'en'
						? 'bg-green-600 text-white'
						: 'hover:bg-gray-100 cursor-pointer'
				}`}
			>
				EN
			</button>
		</div>
	)
}
