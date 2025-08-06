import { render, screen } from '@testing-library/react'
import ResultsCounter from '@/components/Search/ResultsCounter'


const renderWithI18n = (component: React.ReactElement) => {
	return render(component)
}

describe('ResultsCounter', () => {
	it('renders artists count correctly', () => {
		renderWithI18n(
			<ResultsCounter
				offset={0}
				itemsLength={20}
				total={100}
				itemType="artists"
			/>
		)

		expect(screen.getByText(/1/)).toBeInTheDocument()
		expect(screen.getByText(/20/)).toBeInTheDocument()
		expect(screen.getByText(/100/)).toBeInTheDocument()
	})

	it('renders albums count correctly', () => {
		renderWithI18n(
			<ResultsCounter
				offset={20}
				itemsLength={15}
				total={50}
				itemType="albums"
			/>
		)

		expect(screen.getByText(/21/)).toBeInTheDocument()
		expect(screen.getByText(/35/)).toBeInTheDocument()
		expect(screen.getByText(/50/)).toBeInTheDocument()
	})

	it('handles edge case when showing all remaining items', () => {
		renderWithI18n(
			<ResultsCounter
				offset={90}
				itemsLength={20}
				total={95}
				itemType="artists"
			/>
		)

		expect(screen.getByText(/91/)).toBeInTheDocument()
		expect(screen.getByText(/95/)).toBeInTheDocument()
	})

	it('handles first page correctly', () => {
		renderWithI18n(
			<ResultsCounter
				offset={0}
				itemsLength={10}
				total={100}
				itemType="albums"
			/>
		)

		expect(screen.getByText(/1/)).toBeInTheDocument()
		expect(screen.getByText(/10/)).toBeInTheDocument()
	})

	it('handles single item correctly', () => {
		renderWithI18n(
			<ResultsCounter offset={0} itemsLength={1} total={1} itemType="artists" />
		)

		expect(screen.getByText(/1/)).toBeInTheDocument()
	})

	it('applies correct CSS classes', () => {
		renderWithI18n(
			<ResultsCounter
				offset={0}
				itemsLength={10}
				total={50}
				itemType="artists"
			/>
		)

		const container = screen.getByText(/1/).closest('div')
		expect(container).toHaveClass('text-center', 'mb-4')

		const paragraph = screen.getByText(/1/).closest('p')
		expect(paragraph).toHaveClass('text-gray-600')
	})

	it('calculates end range correctly with various offsets', () => {
		const testCases = [
			{ offset: 0, itemsLength: 20, total: 100, expectedEnd: 20 },
			{ offset: 80, itemsLength: 20, total: 90, expectedEnd: 90 },
			{ offset: 40, itemsLength: 15, total: 60, expectedEnd: 55 },
		]

		testCases.forEach(({ offset, itemsLength, total, expectedEnd }) => {
			const { unmount } = renderWithI18n(
				<ResultsCounter
					offset={offset}
					itemsLength={itemsLength}
					total={total}
					itemType="artists"
				/>
			)

			expect(
				screen.getByText(new RegExp(expectedEnd.toString()))
			).toBeInTheDocument()
			unmount()
		})
	})
})
