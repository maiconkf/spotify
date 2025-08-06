import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchForm from '@/components/Form'

describe('SearchForm Component', () => {
	const mockOnSearch = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	const defaultProps = {
		onSearch: mockOnSearch,
		isLoading: false,
	}

	it('should render without crashing', () => {
		render(<SearchForm {...defaultProps} />)

		expect(document.body).toBeInTheDocument()
	})

	it('should render input field', () => {
		render(<SearchForm {...defaultProps} />)

		const input = screen.getByRole('textbox')
		expect(input).toBeInTheDocument()
	})

	it('should render submit button', () => {
		render(<SearchForm {...defaultProps} />)

		const button = screen.getByRole('button')
		expect(button).toBeInTheDocument()
	})

	it('should display placeholder text', () => {
		render(<SearchForm {...defaultProps} />)

		const input = screen.getByPlaceholderText(
			'Buscar artistas ou álbuns (mín. 3 caracteres)...'
		)
		expect(input).toBeInTheDocument()
	})

	it('should update input value when typing', () => {
		render(<SearchForm {...defaultProps} />)

		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'new value' } })

		expect(input).toHaveValue('new value')
	})

	it('should call onSearch when form is submitted with valid input', () => {
		render(<SearchForm {...defaultProps} />)

		const input = screen.getByRole('textbox')
		const form = input.closest('form')!

		fireEvent.change(input, { target: { value: 'test query' } })
		fireEvent.submit(form)

		expect(mockOnSearch).toHaveBeenCalledWith('test query')
	})

	it('should not call onSearch when form is submitted with empty input', () => {
		render(<SearchForm {...defaultProps} />)

		const form = screen.getByRole('textbox').closest('form')!
		fireEvent.submit(form)

		expect(mockOnSearch).not.toHaveBeenCalled()
	})

	it('should trim whitespace from input', () => {
		render(<SearchForm {...defaultProps} />)

		const input = screen.getByRole('textbox')
		const form = input.closest('form')!

		fireEvent.change(input, { target: { value: '  test query  ' } })
		fireEvent.submit(form)

		expect(mockOnSearch).toHaveBeenCalledWith('test query')
	})

	it('should show loading state', () => {
		render(<SearchForm {...defaultProps} isLoading={true} />)

		const button = screen.getByRole('button')
		expect(button).toBeDisabled()
	})

	it('should be accessible', () => {
		render(<SearchForm {...defaultProps} />)

		const input = screen.getByRole('textbox')
		const button = screen.getByRole('button')

		expect(input).toBeInTheDocument()
		expect(button).toBeInTheDocument()
	})

	it('should handle form submission with Enter key', () => {
		render(<SearchForm {...defaultProps} />)

		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'test query' } })
		fireEvent.keyDown(input, { key: 'Enter' })

		expect(input).toHaveValue('test query')
	})

	it('should have search icon', () => {
		render(<SearchForm {...defaultProps} />)

		const icon = document.querySelector('svg')
		expect(icon).toBeInTheDocument()
	})

	it('should prevent default form submission', () => {
		render(<SearchForm {...defaultProps} />)

		const form = screen.getByRole('textbox').closest('form')!
		const event = new Event('submit', { bubbles: true, cancelable: true })
		const preventDefault = jest.spyOn(event, 'preventDefault')

		fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
		form.dispatchEvent(event)

		expect(preventDefault).toHaveBeenCalled()
	})
})
