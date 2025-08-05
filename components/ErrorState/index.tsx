import { ErrorStateProps } from '@/types'
import { useTranslations } from '@/hooks/useTranslations'

export default function ErrorState({}: ErrorStateProps) {
	const { t } = useTranslations()

	return (
		<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
			<h3 className="text-red-800 font-semibold mb-2">{t('error.title')}</h3>
			<p className="text-red-600">{t('error.subtitle')}</p>
		</div>
	)
}
