import { render, screen, fireEvent } from '@testing-library/react'
import SearchResultsHeader from '@/components/Search/SearchResultsHeader'

jest.mock('lucide-react', () => ({
	X: () => <span data-testid="x-icon" />,
}))

const renderWithI18n = (component: React.ReactElement) => {
	return render(component)
}

describe('SearchResultsHeader', () => {
	const mockOnClearSearch = jest.fn()

	beforeEach(() => {
		mockOnClearSearch.mockClear()
	})

	it('renders search query in header', () => {
		renderWithI18n(
			<SearchResultsHeader
				searchQuery="test query"
				onClearSearch={mockOnClearSearch}
			/>
		)

		expect(screen.getByText(/test query/)).toBeInTheDocument()
	})

	it('renders clear search button', () => {
		renderWithI18n(
			<SearchResultsHeader
				searchQuery="test query"
				onClearSearch={mockOnClearSearch}
			/>
		)

		const clearButton = screen.getByRole('button')
		expect(clearButton).toBeInTheDocument()
		expect(screen.getByTestId('x-icon')).toBeInTheDocument()
	})

	it('calls onClearSearch when clear button is clicked', () => {
		renderWithI18n(
			<SearchResultsHeader
				searchQuery="test query"
				onClearSearch={mockOnClearSearch}
			/>
		)

		const clearButton = screen.getByRole('button')
		fireEvent.click(clearButton)

		expect(mockOnClearSearch).toHaveBeenCalledTimes(1)
	})

	it('applies correct CSS classes to header', () => {
		renderWithI18n(
			<SearchResultsHeader
				searchQuery="test query"
				onClearSearch={mockOnClearSearch}
			/>
		)

		const header = screen.getByRole('heading', { level: 2 })
		expect(header).toHaveClass('text-lg', 'font-semibold', 'text-gray-900')
	})

	it('applies correct CSS classes to clear button', () => {
		renderWithI18n(
			<SearchResultsHeader
				searchQuery="test query"
				onClearSearch={mockOnClearSearch}
			/>
		)

		const clearButton = screen.getByRole('button')
		expect(clearButton).toHaveClass(
			'cursor-pointer',
			'flex',
			'items-center',
			'gap-2',
			'text-sm',
			'text-gray-600',
			'hover:text-gray-900',
			'hover:bg-gray-100',
			'px-3',
			'py-2',
			'rounded-lg',
			'transition-colors'
		)
	})

	it('renders with empty search query', () => {
		renderWithI18n(
			<SearchResultsHeader searchQuery="" onClearSearch={mockOnClearSearch} />
		)

		const header = screen.getByRole('heading', { level: 2 })
		expect(header).toBeInTheDocument()
	})

	it('renders with special characters in search query', () => {
		const specialQuery = "test & <script>alert('xss')</script>"
		renderWithI18n(
			<SearchResultsHeader
				searchQuery={specialQuery}
				onClearSearch={mockOnClearSearch}
			/>
		)

		expect(
			screen.getByText(
				new RegExp(specialQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
			)
		).toBeInTheDocument()
	})

	it('has proper layout structure', () => {
		renderWithI18n(
			<SearchResultsHeader
				searchQuery="test query"
				onClearSearch={mockOnClearSearch}
			/>
		)

		const container = screen.getByRole('heading', { level: 2 }).parentElement
		expect(container).toHaveClass(
			'flex',
			'items-center',
			'justify-between',
			'mb-6'
		)
	})
})
