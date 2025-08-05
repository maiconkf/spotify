# Kanastra Spotify Challenge

Este é um projeto [Next.js](https://nextjs.org) para busca de artistas e álbuns utilizando a API do Spotify.

## ✨ Funcionalidades

- 🔍 **Busca de artistas**: Pesquise artistas por nome
- 📄 **Paginação inteligente**: Navegue pelos resultados com paginação completa
- 👤 **Página individual do artista**: Visualize detalhes completos, incluindo:
  - Informações do artista (seguidores, popularidade, gêneros)
  - Lista completa de álbuns
  - Top tracks do artista
  - Links diretos para o Spotify
- 🌍 **Sistema de internacionalização (i18n)**: Interface em português e inglês
- 🔄 **Troca de idioma**: Switcher de idioma disponível em todas as páginas
- 🔐 **Autenticação automática**: Sistema de tokens gerenciado automaticamente
- 📱 **Interface responsiva**: Funciona perfeitamente em qualquer dispositivo
- ⚡ **Performance otimizada**: Carregamento rápido com Next.js e React Query

## 🚀 Como executar

### 1. Configurar credenciais do Spotify

Antes de executar o projeto, você precisa configurar suas credenciais do Spotify API:

1. Acesse o [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Crie uma nova aplicação ou use uma existente
3. Copie o **Client ID** e **Client Secret**
4. Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
SPOTIFY_CLIENT_ID=seu_client_id_aqui
SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui
```

### 2. Instalar dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Executar em modo de desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 🛠️ Tecnologias utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **React Query (@tanstack/react-query)** - Gerenciamento de estado server
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones

## 🏗️ Arquitetura

### Autenticação

O projeto utiliza o fluxo **Client Credentials** do Spotify API:

- Tokens são gerenciados automaticamente
- Renovação automática quando expiram
- Interceptors do Axios para incluir automaticamente headers de autorização

### Sistema de Internacionalização (i18n)

O projeto implementa um sistema completo de internacionalização com as seguintes características:

- **Idiomas suportados**: Português brasileiro (pt-br) e Inglês (en)
- **Troca dinâmica**: LanguageSwitcher disponível em todas as páginas
- **Tokenização**: Sistema de interpolação de variáveis com sintaxe `{{variável}}`
- **Contexto global**: Estado do idioma gerenciado via React Context
- **Traduções tipadas**: Interface TypeScript para garantir consistência
- **Persistência**: Idioma selecionado mantido durante a navegação

#### Estrutura do i18n:

```
/lib/i18n/
  index.ts              # Motor de tradução com tokenização
  /locales/
    pt-br.ts           # Traduções em português
    en.ts              # Traduções em inglês
/contexts/
  I18nContext.tsx      # Contexto de internacionalização
/hooks/
  useLocalization.ts   # Hook para uso das traduções
/components/
  LanguageSwitcher/    # Componente de troca de idioma
```

### Estrutura de pastas

```
/app
  favicon.ico
  globals.css
  layout.tsx                # Layout principal da aplicação
  page.tsx                  # Página principal com busca
  /artist/[id]/
    page.tsx                # Página individual do artista
/components
  /Album/
    /Card/                  # Card individual de álbum
    /List/                  # Lista/grid de álbuns
  /AppHeader/               # Cabeçalho da aplicação
  /Artist/
    /AlbumsSection/         # Seção de álbuns do artista
    /Card/                  # Card do artista nos resultados
    /Header/                # Cabeçalho da página do artista
    /LoadingState/          # Estado de carregamento
    /Profile/               # Perfil do artista
    /TopTracks/             # Top tracks do artista
      ShowMoreButton.tsx    # Botão para mostrar mais tracks
      TopTracksEmptyState.tsx # Estado vazio dos top tracks
      TopTracksLoading.tsx  # Loading dos top tracks
      TrackItem.tsx         # Item individual de track
  /EmptyState/              # Estado vazio
  /ErrorState/              # Estado de erro
  /Form/                    # Componentes de formulário
  /LanguageSwitcher/        # Componente de troca de idioma
  /LoadingState/            # Estado de carregamento geral
  /Pagination/              # Componente de paginação
  /Search/                  # Componentes de busca
    /AlbumResults/          # Resultados de álbens
    /ArtistResults/         # Resultados de artistas
    /ResultsCounter/        # Contador de resultados
    /SearchFilters/         # Filtros de busca
    /SearchResultsHeader/   # Cabeçalho dos resultados
/config
  api.ts                    # Configuração do Axios
/contexts
  AppStateProvider.tsx      # Provider do estado da aplicação
  ArtistContext.tsx         # Contexto do artista
  I18nContext.tsx           # Contexto de internacionalização
/hooks
  useArtistPage.ts          # Hook para página do artista
  useLocalization.ts        # Hook de internacionalização
  useNavigation.ts          # Hook de navegação
  usePrefetchObserver.ts    # Hook de prefetch
  useProgrammaticScroll.ts  # Hook de scroll programático
  useSpotify.ts             # Hooks para API do Spotify
  useUrlInitialization.ts   # Hook de inicialização de URL
/lib
  /i18n/                    # Sistema de internacionalização
    index.ts                # Motor de tradução com tokenização
    /locales/
      pt-br.ts              # Traduções em português brasileiro
      en.ts                 # Traduções em inglês
  spotifyAuth.ts            # Gerenciamento de autenticação
/providers
  /Providers/               # Providers do React Query e contextos
/types
  common.ts                 # Tipos comuns
  components.ts             # Tipos de componentes
  contexts.ts               # Tipos de contextos
  hooks.ts                  # Tipos de hooks
  index.ts                  # Barrel exports
  spotify.ts                # Tipos da API do Spotify
```

## 📝 Requisitos atendidos

- ✅ Busca de artistas por nome
- ✅ Paginação completa dos resultados de busca
- ✅ Exibição de resultados em cards responsivos
- ✅ Navegação para página individual do artista
- ✅ Exibição de informações detalhadas do artista
- ✅ Lista de álbuns do artista
- ✅ Top tracks do artista com reprodução no Spotify
- ✅ Links diretos para o Spotify
- ✅ Sistema completo de internacionalização (PT-BR/EN)
- ✅ Troca de idioma dinâmica em todas as páginas
- ✅ Tokenização de traduções com interpolação de variáveis
- ✅ Interface moderna e responsiva
- ✅ Tratamento de erros e estados de loading
- ✅ Autenticação automática com a API do Spotify

## 🔧 Scripts disponíveis

- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa o linter

## 📚 Saiba mais

Para saber mais sobre as tecnologias utilizadas:

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do React Query](https://tanstack.com/query/latest)
- [API do Spotify](https://developer.spotify.com/documentation/web-api/)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
