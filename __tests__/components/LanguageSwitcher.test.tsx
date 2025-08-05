import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { I18nProvider } from '@/contexts/I18nContext'

describe('LanguageSwitcher Component', () => {
	it('should render language buttons', () => {
		render(
			<I18nProvider>
				<LanguageSwitcher />
			</I18nProvider>
		)

		expect(screen.getByRole('button', { name: 'PT-BR' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument()
		expect(screen.getByText('|')).toBeInTheDocument()
	})

	it('should have proper initial active state', () => {
		render(
			<I18nProvider>
				<LanguageSwitcher />
			</I18nProvider>
		)

		const ptButton = screen.getByRole('button', { name: 'PT-BR' })
		const enButton = screen.getByRole('button', { name: 'EN' })

		expect(ptButton).toHaveClass('bg-green-600', 'text-white')
		expect(enButton).not.toHaveClass('bg-green-600', 'text-white')
	})

	it('should switch to English when EN button is clicked', async () => {
		const user = userEvent.setup()

		render(
			<I18nProvider>
				<LanguageSwitcher />
			</I18nProvider>
		)

		const enButton = screen.getByRole('button', { name: 'EN' })
		const ptButton = screen.getByRole('button', { name: 'PT-BR' })

		await user.click(enButton)

		expect(enButton).toHaveClass('bg-green-600', 'text-white')
		expect(ptButton).not.toHaveClass('bg-green-600', 'text-white')
	})

	it('should switch back to Portuguese when PT-BR button is clicked', async () => {
		const user = userEvent.setup()

		render(
			<I18nProvider>
				<LanguageSwitcher />
			</I18nProvider>
		)

		const enButton = screen.getByRole('button', { name: 'EN' })
		const ptButton = screen.getByRole('button', { name: 'PT-BR' })

		await user.click(enButton)
		expect(enButton).toHaveClass('bg-green-600', 'text-white')

		await user.click(ptButton)
		expect(ptButton).toHaveClass('bg-green-600', 'text-white')
		expect(enButton).not.toHaveClass('bg-green-600', 'text-white')
	})

	it('should have proper container structure', () => {
		render(
			<I18nProvider>
				<LanguageSwitcher />
			</I18nProvider>
		)

		const container = document.querySelector('.flex')
		expect(container).toBeInTheDocument()
		expect(container).toHaveClass('flex', 'items-center', 'gap-1')
	})

	it('should have hover styles on inactive buttons', () => {
		render(
			<I18nProvider>
				<LanguageSwitcher />
			</I18nProvider>
		)

		const enButton = screen.getByRole('button', { name: 'EN' })
		expect(enButton).toHaveClass('hover:bg-gray-100', 'cursor-pointer')
	})

	it('should handle multiple language switches', async () => {
		const user = userEvent.setup()

		render(
			<I18nProvider>
				<LanguageSwitcher />
			</I18nProvider>
		)

		const enButton = screen.getByRole('button', { name: 'EN' })
		const ptButton = screen.getByRole('button', { name: 'PT-BR' })

		await user.click(enButton)
		expect(enButton).toHaveClass('bg-green-600', 'text-white')

		await user.click(ptButton)
		expect(ptButton).toHaveClass('bg-green-600', 'text-white')

		await user.click(enButton)
		expect(enButton).toHaveClass('bg-green-600', 'text-white')
	})
})
