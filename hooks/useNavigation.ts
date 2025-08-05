import { useRouter, useParams } from 'next/navigation'
import { UpdateURLParams } from '@/types'

export const useNavigation = () => {
	const router = useRouter()
	const params = useParams()
	const locale = (params?.locale as string) || 'pt-BR'

	const updateURL = ({ query, page, type }: UpdateURLParams) => {
		const urlParams = new URLSearchParams()
		if (query) {
			urlParams.set('q', query)
			urlParams.set('page', page.toString())
			urlParams.set('type', type)
		}

		const newURL = urlParams.toString()
			? `/${locale}?${urlParams.toString()}`
			: `/${locale}`
		router.replace(newURL)
	}

	const goHome = () => {
		router.replace(`/${locale}`)
	}

	const goToArtist = (artistId: string) => {
		router.push(`/${locale}/artist/${artistId}`)
	}

	return {
		updateURL,
		goHome,
		goToArtist,
		locale,
	}
}
