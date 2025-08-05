import { TranslationTokens } from '../index'

export const ptBr: TranslationTokens = {
	search: {
		placeholder: 'Buscar artistas ou álbuns...',
		button: 'Buscar',
		searching: 'Buscando...',
		results: 'Resultados para "{{query}}"',
		clear: 'Limpar busca',
	},

	filters: {
		all: 'Todos',
		artists: 'Artistas',
		albums: 'Álbuns',
	},

	loading: {
		searching: 'Buscando {{type}}...',
		artists: 'artistas',
		albums: 'álbuns',
		loadingArtist: 'Carregando informações do artista...',
		loadingAlbums: 'Carregando álbuns...',
	},

	empty: {
		title: 'Nenhum resultado encontrado',
		subtitle: 'Tente buscar com um termo diferente ou verifique a ortografia.',
		noResults: 'Nenhum {{type}} encontrado',
		artists: 'artista',
		albums: 'álbum',
		welcomeTitle: 'Descubra Artistas e Álbuns',
		welcomeSubtitle:
			'Use a barra de pesquisa acima para encontrar seus artistas favoritos e explorar seus álbuns no Spotify.',
	},

	error: {
		title: 'Ops! Algo deu errado',
		subtitle: 'Não foi possível carregar os dados.',
		retry: 'Tentar novamente',
		artistError: 'Erro ao carregar artista',
		artistNotFound: 'Artista não encontrado',
		albumsError: 'Erro ao carregar álbuns. Tente novamente.',
		checkConnection: 'Verifique sua conexão e tente novamente.',
		goHome: 'Ir para a página inicial',
	},

	artist: {
		followers: '{{count}} seguidores',
		topTracks: 'Top Faixas',
		albums: 'Álbuns',
		showMore: 'Ver mais',
		showLess: 'Ver menos',
		noTopTracks: 'Nenhuma faixa popular encontrada',
		noAlbums: 'Nenhum álbum encontrado',
	},

	artistProfile: {
		popularity: 'Popularidade',
		genres: 'Gêneros',
		openOnSpotify: 'Abrir no Spotify',
	},

	albumsList: {
		noAlbumsDescription:
			'Este artista não possui álbuns disponíveis no momento.',
	},

	artistHeader: {
		backToResults: 'Voltar aos resultados',
	},

	pagination: {
		previous: 'Anterior',
		next: 'Próximo',
		page: 'Página {{current}} de {{total}}',
		showing: 'Mostrando {{start}} - {{end}} de {{total}} {{type}}',
	},

	header: {
		title: 'Spotify Challenge',
		subtitle: 'Descubra música',
	},

	album: {
		tracks: '{{count}} faixas',
		releaseDate: 'Lançado em {{date}}',
		artist: 'Por {{artist}}',
	},

	results: {
		found: '{{count}} {{type}} encontrado(s)',
		artists: 'artistas',
		albums: 'álbuns',
	},

	language: {
		portuguese: 'Português',
		english: 'English',
		switch: 'Mudar idioma',
	},
}
