export default function TopTracksLoading() {
	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<h2 className="text-xl font-bold text-gray-900 mb-4">
				Principais Faixas
			</h2>
			<div className="space-y-3">
				{[...Array(5)].map((_, i) => (
					<div key={i} className="flex items-center gap-4 p-3">
						<div className="w-8 h-4 bg-gray-200 rounded animate-pulse" />
						<div className="w-12 h-12 bg-gray-200 rounded animate-pulse" />
						<div className="flex-1 space-y-2">
							<div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
							<div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
						</div>
						<div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
					</div>
				))}
			</div>
		</div>
	)
}
