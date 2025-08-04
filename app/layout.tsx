import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ArtistProvider } from '@/contexts/ArtistContext'
import { AppStateProvider } from '@/contexts/AppStateProvider'
import Providers from '@/providers/Providers'

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
