'use client'

import { ArtistErrorStateProps } from '@/types'

export function ArtistLoadingSpinner() {
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="text-center">
				<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
				<p className="text-gray-600">Carregando informações do artista...</p>
			</div>
		</div>
	)
}

export function ArtistErrorState({ error, onGoHome }: ArtistErrorStateProps) {
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-2xl font-bold text-gray-900 mb-4">
					{error ? 'Erro ao carregar artista' : 'Artista não encontrado'}
				</h1>
				{error && (
					<p className="text-red-600 mb-4">
						Verifique sua conexão e tente novamente.
					</p>
				)}
				<button
					onClick={onGoHome}
					className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
				>
					Ir para a página inicial
				</button>
			</div>
		</div>
	)
}

export function AlbumsLoadingSpinner() {
	return (
		<div className="text-center py-8">
			<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
			<p className="mt-2 text-gray-600">Carregando álbuns...</p>
		</div>
	)
}

export function AlbumsErrorState() {
	return (
		<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
			<p className="text-red-600">Erro ao carregar álbuns. Tente novamente.</p>
		</div>
	)
}
