import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchForm from '@/components/Form'

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
	<>{children}</>
)

describe('SearchForm Component', () => {
	const mockOnSearch = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	describe('Basic Functionality', () => {
		it('should render form elements', () => {
			render(
				<TestWrapper>
					<SearchForm onSearch={mockOnSearch} isLoading={false} />
				</TestWrapper>
			)

			expect(screen.getByRole('textbox')).toBeInTheDocument()
			expect(
				screen.getByRole('button', { name: /buscar/i })
			).toBeInTheDocument()
		})

		it('should handle form submission with valid query', async () => {
			const user = userEvent.setup()

			render(
				<TestWrapper>
					<SearchForm onSearch={mockOnSearch} isLoading={false} />
				</TestWrapper>
			)

			const input = screen.getByRole('textbox')
			const button = screen.getByRole('button', { name: /buscar/i })

			await user.type(input, 'test query')
			await user.click(button)

			expect(mockOnSearch).toHaveBeenCalledWith('test query')
			expect(mockOnSearch).toHaveBeenCalledTimes(1)
		})

		it('should handle enter key press', async () => {
			const user = userEvent.setup()

			render(
				<TestWrapper>
					<SearchForm onSearch={mockOnSearch} isLoading={false} />
				</TestWrapper>
			)

			const input = screen.getByRole('textbox')
			await user.type(input, 'test query')
			await user.keyboard('{Enter}')

			expect(mockOnSearch).toHaveBeenCalledWith('test query')
		})

		it('should trim whitespace from input', async () => {
			const user = userEvent.setup()

			render(
				<TestWrapper>
					<SearchForm onSearch={mockOnSearch} isLoading={false} />
				</TestWrapper>
			)

			const input = screen.getByRole('textbox')
			const button = screen.getByRole('button', { name: /buscar/i })

			await user.type(input, '  test query  ')
			await user.click(button)

			expect(mockOnSearch).toHaveBeenCalledWith('test query')
		})

		it('should not submit empty queries', async () => {
			const user = userEvent.setup()

			render(
				<TestWrapper>
					<SearchForm onSearch={mockOnSearch} isLoading={false} />
				</TestWrapper>
			)

			const button = screen.getByRole('button', { name: /buscar/i })
			await user.click(button)

			expect(mockOnSearch).not.toHaveBeenCalled()
		})

		it('should not submit whitespace-only queries', async () => {
			const user = userEvent.setup()

			render(
				<TestWrapper>
					<SearchForm onSearch={mockOnSearch} isLoading={false} />
				</TestWrapper>
			)

			const input = screen.getByRole('textbox')
			const button = screen.getByRole('button', { name: /buscar/i })

			await user.type(input, '   ')
			await user.click(button)

			expect(mockOnSearch).not.toHaveBeenCalled()
		})

		it('should update input value when user types', async () => {
			const user = userEvent.setup()

			render(
				<TestWrapper>
					<SearchForm onSearch={mockOnSearch} isLoading={false} />
				</TestWrapper>
			)

			const input = screen.getByRole('textbox')
			await user.type(input, 'Beatles')

			expect(input).toHaveValue('Beatles')
		})
	})

	describe('Loading State', () => {
		it('should disable form when loading', () => {
			render(
				<TestWrapper>
					<SearchForm onSearch={mockOnSearch} isLoading={true} />
				</TestWrapper>
			)

			const input = screen.getByRole('textbox')
			const button = screen.getByRole('button')

			expect(input).toBeDisabled()
			expect(button).toBeDisabled()
		})

		it('should enable button when input has valid text', async () => {
			const user = userEvent.setup()

			render(
				<TestWrapper>
					<SearchForm onSearch={mockOnSearch} isLoading={false} />
				</TestWrapper>
			)

			const input = screen.getByRole('textbox')
			const button = screen.getByRole('button')

			expect(button).toBeDisabled()

			await user.type(input, 'test')

			expect(button).not.toBeDisabled()
		})
	})

	describe('Form Structure', () => {
		it('should have proper form structure', () => {
			render(
				<TestWrapper>
					<SearchForm onSearch={mockOnSearch} isLoading={false} />
				</TestWrapper>
			)

			const form = document.querySelector('form')
			expect(form).toBeInTheDocument()
		})

		it('should have search icon', () => {
			render(
				<TestWrapper>
					<SearchForm onSearch={mockOnSearch} isLoading={false} />
				</TestWrapper>
			)

			const icon = document.querySelector('svg')
			expect(icon).toBeInTheDocument()
		})

		it('should handle form submission via form onSubmit', () => {
			render(
				<TestWrapper>
					<SearchForm onSearch={mockOnSearch} isLoading={false} />
				</TestWrapper>
			)

			const form = document.querySelector('form')
			const input = screen.getByRole('textbox')

			fireEvent.change(input, { target: { value: 'test query' } })

			fireEvent.submit(form!)

			expect(mockOnSearch).toHaveBeenCalledWith('test query')
		})

		it('should prevent default form submission', () => {
			render(
				<TestWrapper>
					<SearchForm onSearch={mockOnSearch} isLoading={false} />
				</TestWrapper>
			)

			const form = document.querySelector('form')
			const input = screen.getByRole('textbox')

			fireEvent.change(input, { target: { value: 'test' } })

			const submitEvent = new Event('submit', {
				bubbles: true,
				cancelable: true,
			})
			const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault')

			fireEvent(form!, submitEvent)

			expect(preventDefaultSpy).toHaveBeenCalled()
		})
	})
})
