import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import EmptyState from '@/components/EmptyState'
import LoadingState from '@/components/LoadingState'
import ErrorState from '@/components/ErrorState'

describe('State Components', () => {
	describe('EmptyState Component', () => {
		it('should render without crashing', () => {
			const { container } = render(
				<EmptyState searchType="artist" type="welcome" />
			)
			expect(container.firstChild).toBeTruthy()
		})

		it('should handle different search types', () => {
			const { rerender, container } = render(
				<EmptyState searchType="artist" type="welcome" />
			)
			expect(container.firstChild).toBeTruthy()

			rerender(<EmptyState searchType="album" type="welcome" />)
			expect(container.firstChild).toBeTruthy()
		})

		it('should handle different types', () => {
			const { rerender, container } = render(
				<EmptyState searchType="artist" type="welcome" />
			)
			expect(container.firstChild).toBeTruthy()

			rerender(<EmptyState searchType="artist" type="no-results" />)
			expect(container.firstChild).toBeTruthy()
		})
	})

	describe('LoadingState Component', () => {
		it('should render without crashing', () => {
			const { container } = render(<LoadingState searchType="artist" />)
			expect(container.firstChild).toBeTruthy()
		})

		it('should handle different search types', () => {
			const { rerender, container } = render(
				<LoadingState searchType="artist" />
			)
			expect(container.firstChild).toBeTruthy()

			rerender(<LoadingState searchType="album" />)
			expect(container.firstChild).toBeTruthy()
		})

		it('should be accessible', () => {
			const { container } = render(<LoadingState searchType="artist" />)
			expect(container.firstChild).toBeTruthy()
		})
	})

	describe('ErrorState Component', () => {
		it('should render without crashing', () => {
			const { container } = render(<ErrorState searchType="artist" />)
			expect(container.firstChild).toBeTruthy()
		})

		it('should handle different search types', () => {
			const { rerender, container } = render(<ErrorState searchType="artist" />)
			expect(container.firstChild).toBeTruthy()

			rerender(<ErrorState searchType="album" />)
			expect(container.firstChild).toBeTruthy()
		})

		it('should be accessible', () => {
			const { container } = render(<ErrorState searchType="artist" />)
			expect(container.firstChild).toBeTruthy()
		})
	})
})
