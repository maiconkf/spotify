import { render, screen, fireEvent } from '@testing-library/react'
import ArtistHeader from '@/components/Artist/Header'
import { I18nProvider } from '@/contexts/I18nContext'

jest.mock('@/components/LanguageSwitcher', () => {
	return function MockLanguageSwitcher() {
		return <div data-testid="language-switcher">Language Switcher</div>
	}
})

jest.mock('lucide-react', () => ({
	ArrowLeft: () => <span data-testid="arrow-left-icon" />,
}))

const renderWithI18n = (component: React.ReactElement) => {
	return render(<I18nProvider>{component}</I18nProvider>)
}

describe('ArtistHeader', () => {
	const mockOnBack = jest.fn()

	beforeEach(() => {
		mockOnBack.mockClear()
	})

	it('renders back button with icon', () => {
		renderWithI18n(<ArtistHeader onBack={mockOnBack} />)

		expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument()
		const backButton = screen.getByRole('button')
		expect(backButton).toBeInTheDocument()
	})

	it('renders LanguageSwitcher component', () => {
		renderWithI18n(<ArtistHeader onBack={mockOnBack} />)

		expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
	})

	it('calls onBack when back button is clicked', () => {
		renderWithI18n(<ArtistHeader onBack={mockOnBack} />)

		const backButton = screen.getByRole('button')
		fireEvent.click(backButton)

		expect(mockOnBack).toHaveBeenCalledTimes(1)
	})

	it('applies correct CSS classes to header', () => {
		renderWithI18n(<ArtistHeader onBack={mockOnBack} />)

		const header = screen.getByRole('banner')
		expect(header).toHaveClass(
			'bg-white',
			'shadow-sm',
			'border-b',
			'border-gray-200'
		)
	})

	it('applies correct CSS classes to back button', () => {
		renderWithI18n(<ArtistHeader onBack={mockOnBack} />)

		const backButton = screen.getByRole('button')
		expect(backButton).toHaveClass(
			'flex',
			'items-center',
			'gap-2',
			'text-gray-600',
			'cursor-pointer',
			'hover:text-gray-900',
			'transition-colors'
		)
	})

	it('has proper layout structure', () => {
		renderWithI18n(<ArtistHeader onBack={mockOnBack} />)

		const header = screen.getByRole('banner')
		expect(header).toBeInTheDocument()

		const container = screen.getByRole('button').closest('.max-w-7xl')
		expect(container).toHaveClass(
			'max-w-7xl',
			'mx-auto',
			'px-4',
			'sm:px-6',
			'lg:px-8',
			'py-4'
		)
	})

	it('positions elements correctly with flexbox', () => {
		renderWithI18n(<ArtistHeader onBack={mockOnBack} />)

		expect(screen.getByRole('button')).toBeInTheDocument()
		expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
	})

	it('maintains accessibility with proper button role', () => {
		renderWithI18n(<ArtistHeader onBack={mockOnBack} />)

		const backButton = screen.getByRole('button')
		expect(backButton).toBeInTheDocument()
	})
})
