import { render, screen } from '@testing-library/react'
import Providers from '@/providers/Providers'

jest.mock('@/contexts/AppStateProvider', () => ({
	AppStateProvider: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
}))

jest.mock('@/contexts/ArtistContext', () => ({
	ArtistProvider: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
}))

describe('Providers', () => {
	it('renders children correctly', () => {
		render(
			<Providers>
				<div data-testid="test-child">Test Content</div>
			</Providers>
		)

		expect(screen.getByTestId('test-child')).toBeInTheDocument()
		expect(screen.getByText('Test Content')).toBeInTheDocument()
	})

	it('provides necessary context providers', () => {
		const { container } = render(
			<Providers>
				<div>Content</div>
			</Providers>
		)

		expect(container.firstChild).toBeTruthy()
	})

	it('handles multiple children', () => {
		render(
			<Providers>
				<div data-testid="child-1">Child 1</div>
				<div data-testid="child-2">Child 2</div>
			</Providers>
		)

		expect(screen.getByTestId('child-1')).toBeInTheDocument()
		expect(screen.getByTestId('child-2')).toBeInTheDocument()
	})

	it('renders without errors', () => {
		expect(() => {
			render(
				<Providers>
					<div>Test</div>
				</Providers>
			)
		}).not.toThrow()
	})
})
