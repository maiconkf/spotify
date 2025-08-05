import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['pt-BR', 'en']
const defaultLocale = 'pt-BR'

function getLocale(request: NextRequest): string {
	const acceptLanguage = request.headers.get('accept-language') || ''
	let locale = defaultLocale

	if (acceptLanguage.includes('en')) {
		locale = 'en'
	} else if (acceptLanguage.includes('pt')) {
		locale = 'pt-BR'
	}

	return locale
}

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname

	const pathnameIsMissingLocale = locales.every(
		locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	)

	if (pathnameIsMissingLocale) {
		const locale = getLocale(request)

		if (pathname === '/') {
			return NextResponse.redirect(new URL(`/${locale}`, request.url))
		}

		return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
