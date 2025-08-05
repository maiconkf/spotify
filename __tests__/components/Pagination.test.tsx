import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from '@/components/Pagination'

describe('Pagination Component', () => {
	const mockOnPageChange = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	describe('Basic Rendering', () => {
		it('should not render when there is only one page', () => {
			const { container } = render(
				<Pagination
					currentPage={1}
					totalItems={10}
					itemsPerPage={20}
					onPageChange={mockOnPageChange}
				/>
			)

			expect(container.firstChild).toBeNull()
		})

		it('should render pagination when there are multiple pages', () => {
			render(
				<Pagination
					currentPage={1}
					totalItems={100}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			const buttons = screen.getAllByRole('button')
			expect(buttons.length).toBeGreaterThan(2)

			expect(screen.getByText('1')).toBeInTheDocument()
		})

		it('should render page numbers correctly', () => {
			render(
				<Pagination
					currentPage={1}
					totalItems={50}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			expect(screen.getByText('1')).toBeInTheDocument()
			expect(screen.getByText('2')).toBeInTheDocument()
			expect(screen.getByText('3')).toBeInTheDocument()
		})
	})

	describe('Page Navigation', () => {
		it('should call onPageChange when page number is clicked', async () => {
			const user = userEvent.setup()

			render(
				<Pagination
					currentPage={1}
					totalItems={50}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			const page2Button = screen.getByText('2')
			await user.click(page2Button)

			expect(mockOnPageChange).toHaveBeenCalledWith(2)
		})

		it('should call onPageChange when next button is clicked', async () => {
			const user = userEvent.setup()

			render(
				<Pagination
					currentPage={1}
					totalItems={50}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			const buttons = screen.getAllByRole('button')
			const nextButton = buttons[buttons.length - 1]
			await user.click(nextButton)

			expect(mockOnPageChange).toHaveBeenCalledWith(2)
		})

		it('should call onPageChange when previous button is clicked', async () => {
			const user = userEvent.setup()

			render(
				<Pagination
					currentPage={3}
					totalItems={50}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			const buttons = screen.getAllByRole('button')
			const prevButton = buttons[0]
			await user.click(prevButton)

			expect(mockOnPageChange).toHaveBeenCalledWith(2)
		})
	})

	describe('Button States', () => {
		it('should disable previous button on first page', () => {
			render(
				<Pagination
					currentPage={1}
					totalItems={50}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			const buttons = screen.getAllByRole('button')
			const prevButton = buttons[0]
			expect(prevButton).toBeDisabled()
		})

		it('should disable next button on last page', () => {
			render(
				<Pagination
					currentPage={5}
					totalItems={50}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			const buttons = screen.getAllByRole('button')
			const nextButton = buttons[buttons.length - 1]
			expect(nextButton).toBeDisabled()
		})

		it('should highlight current page', () => {
			render(
				<Pagination
					currentPage={3}
					totalItems={50}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			const currentPageButton = screen.getByText('3')
			expect(currentPageButton).toHaveClass('bg-green-600', 'text-white')
		})

		it('should not highlight non-current pages', () => {
			render(
				<Pagination
					currentPage={3}
					totalItems={50}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			const page2Button = screen.getByText('2')
			expect(page2Button).not.toHaveClass('bg-green-600', 'text-white')
			expect(page2Button).toHaveClass('bg-white', 'text-gray-700')
		})
	})

	describe('Ellipsis Behavior', () => {
		it('should show ellipsis for large page ranges', () => {
			render(
				<Pagination
					currentPage={10}
					totalItems={200}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			const ellipsis = screen.getAllByText('...')
			expect(ellipsis.length).toBeGreaterThan(0)
		})

		it('should not allow clicking on ellipsis', async () => {
			const user = userEvent.setup()

			render(
				<Pagination
					currentPage={10}
					totalItems={200}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			const ellipsis = screen.getAllByText('...')[0]
			await user.click(ellipsis)

			expect(mockOnPageChange).not.toHaveBeenCalled()
		})
	})

	describe('Total Pages Calculation', () => {
		it('should calculate correct total pages', () => {
			render(
				<Pagination
					currentPage={1}
					totalItems={25}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			expect(screen.getByText('1')).toBeInTheDocument()
			expect(screen.getByText('2')).toBeInTheDocument()
			expect(screen.getByText('3')).toBeInTheDocument()
			expect(screen.queryByText('4')).not.toBeInTheDocument()
		})

		it('should handle exact divisions', () => {
			render(
				<Pagination
					currentPage={1}
					totalItems={30}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			expect(screen.getByText('1')).toBeInTheDocument()
			expect(screen.getByText('2')).toBeInTheDocument()
			expect(screen.getByText('3')).toBeInTheDocument()
			expect(screen.queryByText('4')).not.toBeInTheDocument()
		})
	})

	describe('Edge Cases', () => {
		it('should handle zero total items', () => {
			const { container } = render(
				<Pagination
					currentPage={1}
					totalItems={0}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			expect(container.firstChild).toBeNull()
		})

		it('should handle large page numbers', () => {
			render(
				<Pagination
					currentPage={50}
					totalItems={1000}
					itemsPerPage={10}
					onPageChange={mockOnPageChange}
				/>
			)

			expect(screen.getByText('50')).toBeInTheDocument()
			expect(screen.getByText('100')).toBeInTheDocument()
		})
	})
})
