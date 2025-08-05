import { ReactNode } from 'react'

export interface RootLayoutProps {
	children: ReactNode
}

export interface LocaleLayoutProps {
	children: ReactNode
	params: Promise<{ locale: string }>
}

export interface ArtistLayoutProps {
	children: ReactNode
	params: Promise<{
		id: string
		locale: string
	}>
}
