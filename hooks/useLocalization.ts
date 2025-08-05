'use client'

import { useI18n } from '@/contexts/I18nContext'

export function useLocalization() {
	const { language } = useI18n()

	const locale = language === 'pt-br' ? 'pt-BR' : 'en-US'

	const formatNumber = (number: number): string => {
		return number.toLocaleString(locale)
	}

	const formatDate = (date: string | Date): string => {
		const dateObj = typeof date === 'string' ? new Date(date) : date
		return dateObj.toLocaleDateString(locale, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	const formatShortDate = (date: string | Date): string => {
		const dateObj = typeof date === 'string' ? new Date(date) : date
		return dateObj.toLocaleDateString(locale, {
			year: 'numeric',
			month: 'short',
		})
	}

	const formatCurrency = (amount: number, currency = 'BRL'): string => {
		const currencyCode = language === 'pt-br' ? 'BRL' : 'USD'
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currency || currencyCode,
		}).format(amount)
	}

	return {
		locale,
		formatNumber,
		formatDate,
		formatShortDate,
		formatCurrency,
	}
}
