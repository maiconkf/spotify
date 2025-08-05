import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'
	const locales = ['pt-BR', 'en']

	const routes = ['', '/artist/[id]']

	const sitemap: MetadataRoute.Sitemap = []

	locales.forEach(locale => {
		routes.forEach(route => {
			if (route === '/artist/[id]') {
				return
			}

			sitemap.push({
				url: `${baseUrl}/${locale}${route}`,
				lastModified: new Date(),
				changeFrequency: 'daily',
				priority: route === '' ? 1 : 0.8,
				alternates: {
					languages: locales.reduce((acc, loc) => {
						acc[loc] = `${baseUrl}/${loc}${route}`
						return acc
					}, {} as Record<string, string>),
				},
			})
		})
	})

	return sitemap
}
