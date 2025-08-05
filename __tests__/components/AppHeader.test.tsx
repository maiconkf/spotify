import { render, screen } from '@testing-library/react'
import AppHeader from '@/components/AppHeader'
import { I18nProvider } from '@/contexts/I18nContext'

jest.mock('@/components/LanguageSwitcher', () => {
	return function MockLanguageSwitcher() {
		return <div data-testid="language-switcher">Language Switcher</div>
	}
})

jest.mock('lucide-react', () => ({
	Music: () => <span data-testid="music-icon" />,
}))

const renderWithI18n = (component: React.ReactElement) => {
	return render(<I18nProvider>{component}</I18nProvider>)
}

describe('AppHeader', () => {
	it('renders Spotify logo and title', () => {
		renderWithI18n(
			<AppHeader>
				<div />
			</AppHeader>
		)

		expect(screen.getByTestId('music-icon')).toBeInTheDocument()
		expect(screen.getByText('Spotify')).toBeInTheDocument()
	})

	it('renders LanguageSwitcher component', () => {
		renderWithI18n(
			<AppHeader>
				<div />
			</AppHeader>
		)

		expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
	})

	it('renders children content', () => {
		renderWithI18n(
			<AppHeader>
				<div data-testid="child-content">Test Child Content</div>
			</AppHeader>
		)

		expect(screen.getByTestId('child-content')).toBeInTheDocument()
		expect(screen.getByText('Test Child Content')).toBeInTheDocument()
	})

	it('applies correct CSS classes to header', () => {
		renderWithI18n(
			<AppHeader>
				<div />
			</AppHeader>
		)

		const header = screen.getByRole('banner')
		expect(header).toHaveClass(
			'bg-white',
			'shadow-sm',
			'border-b',
			'border-gray-200'
		)
	})

	it('applies correct CSS classes to title', () => {
		renderWithI18n(
			<AppHeader>
				<div />
			</AppHeader>
		)

		const title = screen.getByRole('heading', { level: 1 })
		expect(title).toHaveClass('text-3xl', 'font-bold', 'text-gray-900')
	})

	it('has proper layout structure', () => {
		renderWithI18n(
			<AppHeader>
				<div />
			</AppHeader>
		)

		const header = screen.getByRole('banner')
		expect(header).toBeInTheDocument()
		expect(screen.getByText('Spotify')).toBeInTheDocument()
	})

	it('renders multiple children', () => {
		renderWithI18n(
			<AppHeader>
				<div data-testid="child-1">Child 1</div>
				<div data-testid="child-2">Child 2</div>
			</AppHeader>
		)

		expect(screen.getByTestId('child-1')).toBeInTheDocument()
		expect(screen.getByTestId('child-2')).toBeInTheDocument()
	})

	it('has proper flexbox layout for header content', () => {
		renderWithI18n(
			<AppHeader>
				<div />
			</AppHeader>
		)

		expect(screen.getByTestId('music-icon')).toBeInTheDocument()
		expect(screen.getByText('Spotify')).toBeInTheDocument()
		expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
	})

	it('renders without children', () => {
		renderWithI18n(
			<AppHeader>
				<div />
			</AppHeader>
		)

		expect(screen.getByText('Spotify')).toBeInTheDocument()
		expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
	})

	it('renders multiple children', () => {
		renderWithI18n(
			<AppHeader>
				<div data-testid="child-1">Child 1</div>
				<div data-testid="child-2">Child 2</div>
			</AppHeader>
		)

		expect(screen.getByTestId('child-1')).toBeInTheDocument()
		expect(screen.getByTestId('child-2')).toBeInTheDocument()
	})

	it('has proper flexbox layout for header content', () => {
		renderWithI18n(
			<AppHeader>
				<div />
			</AppHeader>
		)

		expect(screen.getByTestId('music-icon')).toBeInTheDocument()
		expect(screen.getByText('Spotify')).toBeInTheDocument()
		expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
	})

	it('positions logo and title in center', () => {
		renderWithI18n(
			<AppHeader>
				<div />
			</AppHeader>
		)

		const logoContainer = screen.getByTestId('music-icon').closest('.flex')
		expect(logoContainer).toHaveClass('flex', 'items-center', 'gap-3')
	})

	it('positions language switcher on the right', () => {
		renderWithI18n(
			<AppHeader>
				<div />
			</AppHeader>
		)

		const languageSwitcherContainer = screen
			.getByTestId('language-switcher')
			.closest('.flex-1')
		expect(languageSwitcherContainer).toHaveClass(
			'flex-1',
			'flex',
			'justify-end'
		)
	})
})
