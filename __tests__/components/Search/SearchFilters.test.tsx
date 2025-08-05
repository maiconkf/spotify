import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchFilters from '@/components/Search/SearchFilters'

jest.mock('@/contexts/I18nContext', () => ({
	useI18n: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				'filters.artists': 'Artists',
				'filters.albums': 'Albums',
			}
			return translations[key] || key
		},
	}),
}))

jest.mock('lucide-react', () => ({
	Users: ({ className }: { className?: string }) => (
		<div data-testid="users-icon" className={className}>
			Users Icon
		</div>
	),
	Disc: ({ className }: { className?: string }) => (
		<div data-testid="disc-icon" className={className}>
			Disc Icon
		</div>
	),
}))

describe('SearchFilters Component', () => {
	const mockOnFilterChange = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	const defaultProps = {
		searchType: 'artist' as const,
		onFilterChange: mockOnFilterChange,
	}

	it('should render both filter buttons', () => {
		render(<SearchFilters {...defaultProps} />)

		expect(screen.getByText('Artists')).toBeInTheDocument()
		expect(screen.getByText('Albums')).toBeInTheDocument()

		expect(screen.getByTestId('users-icon')).toBeInTheDocument()
		expect(screen.getByTestId('disc-icon')).toBeInTheDocument()
	})

	it('should highlight artist button when searchType is artist', () => {
		render(<SearchFilters {...defaultProps} searchType="artist" />)

		const artistButton = screen.getByText('Artists').closest('button')
		const albumButton = screen.getByText('Albums').closest('button')

		expect(artistButton).toHaveClass('bg-white', 'text-gray-900', 'shadow-sm')
		expect(artistButton).not.toHaveClass('text-gray-600', 'hover:text-gray-900')

		expect(albumButton).toHaveClass('text-gray-600', 'hover:text-gray-900')
		expect(albumButton).not.toHaveClass(
			'bg-white',
			'text-gray-900',
			'shadow-sm'
		)
	})

	it('should highlight album button when searchType is album', () => {
		render(<SearchFilters {...defaultProps} searchType="album" />)

		const artistButton = screen.getByText('Artists').closest('button')
		const albumButton = screen.getByText('Albums').closest('button')

		expect(albumButton).toHaveClass('bg-white', 'text-gray-900', 'shadow-sm')
		expect(albumButton).not.toHaveClass('text-gray-600', 'hover:text-gray-900')

		expect(artistButton).toHaveClass('text-gray-600', 'hover:text-gray-900')
		expect(artistButton).not.toHaveClass(
			'bg-white',
			'text-gray-900',
			'shadow-sm'
		)
	})

	it('should call onFilterChange with "artist" when artist button is clicked', () => {
		render(<SearchFilters {...defaultProps} />)

		const artistButton = screen.getByText('Artists')
		fireEvent.click(artistButton)

		expect(mockOnFilterChange).toHaveBeenCalledWith('artist')
		expect(mockOnFilterChange).toHaveBeenCalledTimes(1)
	})

	it('should call onFilterChange with "album" when album button is clicked', () => {
		render(<SearchFilters {...defaultProps} />)

		const albumButton = screen.getByText('Albums')
		fireEvent.click(albumButton)

		expect(mockOnFilterChange).toHaveBeenCalledWith('album')
		expect(mockOnFilterChange).toHaveBeenCalledTimes(1)
	})

	it('should have correct button styling and structure', () => {
		render(<SearchFilters {...defaultProps} />)

		const artistButton = screen.getByText('Artists').closest('button')
		const albumButton = screen.getByText('Albums').closest('button')

		expect(artistButton).toHaveClass(
			'flex',
			'items-center',
			'gap-2',
			'px-4',
			'py-2',
			'rounded-md',
			'text-sm',
			'font-medium',
			'cursor-pointer',
			'transition-colors'
		)
		expect(albumButton).toHaveClass(
			'flex',
			'items-center',
			'gap-2',
			'px-4',
			'py-2',
			'rounded-md',
			'text-sm',
			'cursor-pointer',
			'font-medium',
			'transition-colors'
		)
	})

	it('should have correct container styling', () => {
		render(<SearchFilters {...defaultProps} />)

		const outerContainer = screen
			.getByText('Artists')
			.closest('div')?.parentElement
		expect(outerContainer).toHaveClass('flex', 'justify-center', 'mt-4')

		const innerContainer = screen.getByText('Artists').closest('div')
		expect(innerContainer).toHaveClass(
			'flex',
			'bg-gray-100',
			'rounded-lg',
			'p-1'
		)
	})

	it('should render icons with correct classes', () => {
		render(<SearchFilters {...defaultProps} />)

		const usersIcon = screen.getByTestId('users-icon')
		const discIcon = screen.getByTestId('disc-icon')

		expect(usersIcon).toHaveClass('h-4', 'w-4')
		expect(discIcon).toHaveClass('h-4', 'w-4')
	})

	it('should maintain accessibility with clickable buttons', () => {
		render(<SearchFilters {...defaultProps} />)

		const artistButton = screen.getByRole('button', { name: /artists/i })
		const albumButton = screen.getByRole('button', { name: /albums/i })

		expect(artistButton).toBeInTheDocument()
		expect(albumButton).toBeInTheDocument()

		expect(artistButton).not.toBeDisabled()
		expect(albumButton).not.toBeDisabled()
	})

	it('should switch between filters correctly', () => {
		const { rerender } = render(
			<SearchFilters {...defaultProps} searchType="artist" />
		)

		let artistButton = screen.getByText('Artists').closest('button')
		let albumButton = screen.getByText('Albums').closest('button')

		expect(artistButton).toHaveClass('bg-white', 'text-gray-900', 'shadow-sm')
		expect(albumButton).toHaveClass('text-gray-600', 'hover:text-gray-900')

		rerender(<SearchFilters {...defaultProps} searchType="album" />)

		artistButton = screen.getByText('Artists').closest('button')
		albumButton = screen.getByText('Albums').closest('button')

		expect(albumButton).toHaveClass('bg-white', 'text-gray-900', 'shadow-sm')
		expect(artistButton).toHaveClass('text-gray-600', 'hover:text-gray-900')
	})
})
