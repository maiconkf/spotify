import { useRouter } from 'next/navigation'
import { UpdateURLParams } from '@/types'

export const useNavigation = () => {
	const router = useRouter()

	const updateURL = ({ query, page, type }: UpdateURLParams) => {
		const params = new URLSearchParams()
		if (query) {
			params.set('q', query)
			params.set('page', page.toString())
			params.set('type', type)
		}

		const newURL = params.toString() ? `/?${params.toString()}` : '/'
		router.replace(newURL)
	}

	const goHome = () => {
		router.replace('/')
	}

	return {
		updateURL,
		goHome,
	}
}
