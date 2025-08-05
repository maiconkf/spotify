'use client'

import { ArtistErrorStateProps } from '@/types'
import { useTranslations } from '@/hooks/useTranslations'

export function ArtistLoadingSpinner() {
	const { t } = useTranslations()

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="text-center">
				<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
				<p className="text-gray-600">{t('loading.loadingArtist')}</p>
			</div>
		</div>
	)
}

export function ArtistErrorState({ error, onGoHome }: ArtistErrorStateProps) {
	const { t } = useTranslations()

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-2xl font-bold text-gray-900 mb-4">
					{error ? t('error.artistError') : t('error.artistNotFound')}
				</h1>
				{error && (
					<p className="text-red-600 mb-4">{t('error.checkConnection')}</p>
				)}
				<button
					onClick={onGoHome}
					className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
				>
					{t('error.goHome')}
				</button>
			</div>
		</div>
	)
}

export function AlbumsLoadingSpinner() {
	const { t } = useTranslations()

	return (
		<div className="text-center py-8">
			<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
			<p className="mt-2 text-gray-600">{t('loading.loadingAlbums')}</p>
		</div>
	)
}

export function AlbumsErrorState() {
	const { t } = useTranslations()

	return (
		<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
			<p className="text-red-600">{t('error.albumsError')}</p>
		</div>
	)
}
