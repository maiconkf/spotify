import { Music } from 'lucide-react'
import { AppHeaderProps } from '@/types'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function AppHeader({ children }: AppHeaderProps) {
	return (
		<header className="bg-white shadow-sm border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="flex items-center justify-between mb-6">
					<div className="hidden sm:block flex-1"></div>
					<div className="flex items-center gap-3">
						<Music className="h-8 w-8 text-green-600" />
						<h1 className="text-3xl font-bold text-gray-900">Spotify</h1>
					</div>
					<div className="flex-1 flex justify-end">
						<LanguageSwitcher />
					</div>
				</div>
				{children}
			</div>
		</header>
	)
}
