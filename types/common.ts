export type SearchType = 'artist' | 'album'

export interface BaseProps {
	children?: React.ReactNode
	className?: string
}

export interface SearchBaseProps {
	searchType: SearchType
}

export interface PaginationData {
	currentPage: number
	totalItems: number
	itemsPerPage: number
	onPageChange: (page: number) => void
	onScrollToAlbums?: () => void
}

export interface SearchResultsData {
	searchQuery: string
	currentPage: number
	onPageChange: (page: number) => void
	onClearSearch: () => void
}

export interface StoredToken {
	access_token: string
	token_type: string
	expires_at: number
}
