import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['pt-BR', 'en']
const defaultLocale = 'pt-BR'

function getLocale(request: NextRequest): string {
	const acceptLanguage = request.headers.get('accept-language') || ''

	if (acceptLanguage.startsWith('pt')) {
		return 'pt-BR'
	}

	if (acceptLanguage.startsWith('en')) {
		return 'en'
	}

	return defaultLocale
}

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname

	const pathnameIsMissingLocale = locales.every(
		locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	)

	if (pathnameIsMissingLocale) {
		const locale = getLocale(request)

		if (pathname === '/') {
			const response = NextResponse.redirect(new URL(`/${locale}`, request.url))
			response.headers.set(
				'x-debug-accept-language',
				request.headers.get('accept-language') || 'none'
			)
			response.headers.set('x-debug-detected-locale', locale)
			response.headers.set('x-pathname', pathname)
			return response
		}

		const response = NextResponse.redirect(
			new URL(`/${locale}${pathname}`, request.url)
		)
		response.headers.set(
			'x-debug-accept-language',
			request.headers.get('accept-language') || 'none'
		)
		response.headers.set('x-debug-detected-locale', locale)
		response.headers.set('x-pathname', pathname)
		return response
	}

	const response = NextResponse.next()
	response.headers.set('x-pathname', pathname)
	return response
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
