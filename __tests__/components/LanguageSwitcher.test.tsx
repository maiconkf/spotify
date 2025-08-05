import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LanguageSwitcher from '@/components/LanguageSwitcher'

jest.mock('@/hooks/useI18n', () => ({
	useI18n: () => ({
		locale: 'pt-BR',
		changeLocale: jest.fn(),
	}),
}))

describe('LanguageSwitcher Component', () => {
	it('should render language buttons', () => {
		render(<LanguageSwitcher />)

		expect(screen.getByRole('button', { name: 'PT-BR' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument()
	})

	it('should have proper initial active state', () => {
		render(<LanguageSwitcher />)

		const ptButton = screen.getByRole('button', { name: 'PT-BR' })
		const enButton = screen.getByRole('button', { name: 'EN' })

		expect(ptButton).toHaveClass('bg-green-600', 'text-white')
		expect(enButton).toHaveClass('hover:bg-gray-100', 'cursor-pointer')
	})

	it('should render buttons correctly', async () => {
		const user = userEvent.setup()
		render(<LanguageSwitcher />)

		const enButton = screen.getByRole('button', { name: 'EN' })
		const ptButton = screen.getByRole('button', { name: 'PT-BR' })

		await user.click(enButton)
		await user.click(ptButton)

		expect(enButton).toBeInTheDocument()
		expect(ptButton).toBeInTheDocument()
	})

	it('should have proper container structure', () => {
		render(<LanguageSwitcher />)

		const container = screen.getByRole('button', {
			name: 'PT-BR',
		}).parentElement
		expect(container).toHaveClass(
			'flex',
			'items-center',
			'gap-1',
			'text-sm',
			'text-gray-600'
		)
	})

	it('should have hover styles on inactive buttons', () => {
		render(<LanguageSwitcher />)

		const enButton = screen.getByRole('button', { name: 'EN' })
		expect(enButton).toHaveClass('hover:bg-gray-100', 'cursor-pointer')
	})
})
