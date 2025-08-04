import { ErrorStateProps } from '@/types'

export default function ErrorState({ searchType }: ErrorStateProps) {
	return (
		<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
			<p className="text-red-600">
				Erro ao buscar {searchType === 'artist' ? 'artistas' : 'álbuns'}.
				Verifique sua conexão e tente novamente.
			</p>
		</div>
	)
}
