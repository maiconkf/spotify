'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ProvidersProps } from '@/types'
import { I18nProvider } from '@/contexts/I18nContext'

export default function Providers({ children }: ProvidersProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 2,
						refetchOnWindowFocus: false,
						staleTime: 5 * 60 * 1000,
						gcTime: 10 * 60 * 1000,
					},
				},
			})
	)

	return (
		<QueryClientProvider client={queryClient}>
			<I18nProvider>{children}</I18nProvider>
		</QueryClientProvider>
	)
}
