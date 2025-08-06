import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ArtistProvider } from '@/contexts/ArtistContext'
import { AppStateProvider } from '@/contexts/AppStateContext'
import Providers from '@/providers/Providers'
import { RootLayoutProps } from '@/types/layouts'
import { headers } from 'next/headers'
import { Locale } from '@/types'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Kanastra Spotify App',
	description: 'Search for artists and albums on Spotify',
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const headersList = await headers()
	const pathname = headersList.get('x-pathname') || ''

	let locale: Locale = 'pt-BR'

	const segments = pathname.split('/').filter(Boolean)
	const firstSegment = segments[0]

	if (firstSegment === 'en') {
		locale = 'en'
	} else if (firstSegment === 'pt-BR') {
		locale = 'pt-BR'
	}

	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
			>
				<Providers>
					<AppStateProvider>
						<ArtistProvider>{children}</ArtistProvider>
					</AppStateProvider>
				</Providers>
			</body>
		</html>
	)
}
