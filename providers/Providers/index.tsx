'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ProvidersProps } from '@/types'

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
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
