'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { SearchFormProps } from '@/types'
import { useTranslations } from '@/hooks/useTranslations'

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
	const [query, setQuery] = useState('')
	const { t } = useTranslations()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const trimmedQuery = query.trim()
		if (trimmedQuery && trimmedQuery.length >= 3) {
			onSearch(trimmedQuery)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
			<div className="relative">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<Search className="h-5 w-5 text-gray-400" />
				</div>
				<input
					type="text"
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder={t('search.placeholder')}
					className="block w-full pl-10 pr-30 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
					disabled={isLoading}
				/>
				<button
					type="submit"
					disabled={isLoading || !query.trim() || query.trim().length < 3}
					className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-3 rounded-r-lg transition-colors absolute inset-y-0 right-0 flex items-center cursor-pointer"
				>
					{isLoading ? t('search.searching') : t('search.button')}
				</button>
			</div>
		</form>
	)
}
