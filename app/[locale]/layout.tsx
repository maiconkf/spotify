import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateI18nMetadata } from '@/lib/i18n/metadata'
import { LocaleLayoutProps } from '@/types/layouts'

const locales = ['pt-BR', 'en']

export function generateStaticParams() {
	return locales.map(locale => ({ locale }))
}

export async function generateMetadata({
	params,
}: LocaleLayoutProps): Promise<Metadata> {
	const { locale } = await params
	return generateI18nMetadata({
		locale,
	})
}

export default async function LocaleLayout({
	children,
	params,
}: LocaleLayoutProps) {
	const { locale } = await params

	if (!locales.includes(locale)) {
		notFound()
	}

	return <>{children}</>
}
