'use client'

import { ArrowLeft } from 'lucide-react'
import { ArtistHeaderProps } from '@/types'

export default function ArtistHeader({ onBack }: ArtistHeaderProps) {
	return (
		<header className="bg-white shadow-sm border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<button
					onClick={onBack}
					className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
				>
					<ArrowLeft className="h-5 w-5" />
					Voltar aos resultados
				</button>
			</div>
		</header>
	)
}
