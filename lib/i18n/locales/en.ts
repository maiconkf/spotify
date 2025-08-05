import { TranslationTokens } from '../index'

export const en: TranslationTokens = {
	search: {
		placeholder: 'Search artists or albums...',
		button: 'Search',
		searching: 'Searching...',
		results: 'Results for "{{query}}"',
		clear: 'Clear search',
	},

	filters: {
		all: 'All',
		artists: 'Artists',
		albums: 'Albums',
	},

	loading: {
		searching: 'Searching for {{type}}...',
		artists: 'artists',
		albums: 'albums',
		loadingArtist: 'Loading artist information...',
		loadingAlbums: 'Loading albums...',
	},

	empty: {
		title: 'No results found',
		subtitle: 'Try searching with a different term or check the spelling.',
		noResults: 'No {{type}} found',
		artists: 'artist',
		albums: 'album',
		welcomeTitle: 'Discover Artists and Albums',
		welcomeSubtitle:
			'Use the search bar above to find your favorite artists and explore their albums on Spotify.',
	},

	error: {
		title: 'Oops! Something went wrong',
		subtitle: 'Could not load the data.',
		retry: 'Try again',
		artistError: 'Error loading artist',
		artistNotFound: 'Artist not found',
		albumsError: 'Error loading albums. Please try again.',
		checkConnection: 'Check your connection and try again.',
		goHome: 'Go to homepage',
	},

	artist: {
		followers: '{{count}} followers',
		topTracks: 'Top Tracks',
		albums: 'Albums',
		showMore: 'Show more',
		showLess: 'Show less',
		noTopTracks: 'No popular tracks found',
		noAlbums: 'No albums found',
	},

	artistProfile: {
		popularity: 'Popularity',
		genres: 'Genres',
		openOnSpotify: 'Open on Spotify',
	},

	albumsList: {
		noAlbumsDescription: 'This artist has no albums available at the moment.',
	},

	artistHeader: {
		backToResults: 'Back to results',
	},

	pagination: {
		previous: 'Previous',
		next: 'Next',
		page: 'Page {{current}} of {{total}}',
		showing: 'Showing {{start}} - {{end}} of {{total}} {{type}}',
	},

	header: {
		title: 'Spotify Challenge',
		subtitle: 'Discover music',
	},

	album: {
		tracks: '{{count}} tracks',
		releaseDate: 'Released on {{date}}',
		artist: 'By {{artist}}',
	},

	results: {
		found: '{{count}} {{type}} found',
		artists: 'artists',
		albums: 'albums',
	},

	language: {
		portuguese: 'Português',
		english: 'English',
		switch: 'Switch language',
	},
}
