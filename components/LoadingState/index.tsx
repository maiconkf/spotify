import { LoadingStateProps } from '@/types'

export default function LoadingState({ searchType }: LoadingStateProps) {
	return (
		<div className="text-center py-8">
			<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
			<p className="mt-2 text-gray-600">
				Buscando {searchType === 'artist' ? 'artistas' : 'álbuns'}...
			</p>
		</div>
	)
}
