import { useParams, usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { Locale } from '@/types/i18n'

export type { Locale }

const locales: Locale[] = ['pt-BR', 'en']
const defaultLocale: Locale = 'pt-BR'

export function useI18n() {
	const params = useParams()
	const pathname = usePathname()
	const router = useRouter()

	const locale = (params?.locale as Locale) || defaultLocale

	useEffect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.lang = locale
		}
	}, [locale])

	const changeLocale = useCallback(
		(newLocale: Locale) => {
			const segments = pathname.split('/').filter(Boolean)
			const currentLocale = segments[0]

			let newPath = ''
			if (locales.includes(currentLocale as Locale)) {
				segments[0] = newLocale
				newPath = `/${segments.join('/')}`
			} else {
				newPath = `/${newLocale}${pathname}`
			}

			router.push(newPath)
		},
		[pathname, router]
	)

	return {
		locale,
		locales,
		defaultLocale,
		changeLocale,
	}
}
