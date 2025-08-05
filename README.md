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

### Versão do Node.js

Este projeto requer **Node.js 18.x ou superior**. Recomendamos usar a versão **20.x** para melhor compatibilidade.

Verifique sua versão do Node.js:

```bash
node --version
```

### 1. Configurar credenciais do Spotify

Antes de executar o projeto, você precisa configurar suas credenciais do Spotify API:

1. Acesse o [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Crie uma nova aplicação ou use uma existente
3. Copie o **Client ID** e **Client Secret**
4. Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=seu_client_id_aqui
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui
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

### Padronização de Tipos TypeScript

O projeto segue uma arquitetura bem organizada para os tipos TypeScript:

- **Centralização**: Todas as interfaces estão centralizadas na pasta `/types`
- **Modularização**: Tipos organizados por domínio (components, contexts, hooks, etc.)
- **Barrel exports**: Exportação unificada através de `types/index.ts`
- **Tipagem forte**: Interfaces específicas para cada contexto e componente
- **Reutilização**: Tipos comuns compartilhados entre diferentes módulos

#### Organização dos Tipos:

- `types/common.ts` - Interfaces base e tipos compartilhados
- `types/components.ts` - Props de todos os componentes React
- `types/contexts.ts` - Interfaces dos contextos React
- `types/hooks.ts` - Tipos para hooks customizados
- `types/i18n.ts` - Interfaces do sistema de internacionalização
- `types/layouts.ts` - Props dos layouts Next.js
- `types/spotify.ts` - Tipos da API do Spotify

### Sistema de Internacionalização (i18n)

O projeto implementa um sistema completo de internacionalização com as seguintes características:

- **Idiomas suportados**: Português brasileiro (pt-br) e Inglês (en)
- **Troca dinâmica**: LanguageSwitcher disponível em todas as páginas
- **Tokenização**: Sistema de interpolação de variáveis com sintaxe `{{variável}}`
- **Contexto global**: Estado do idioma gerenciado via React Context
- **Traduções tipadas**: Interfaces TypeScript centralizadas para garantir consistência
- **Persistência**: Idioma selecionado mantido durante a navegação
- **Metadados localizados**: Geração automática de metadados SEO por idioma
- **Rotas dinâmicas**: Suporte a rotas localizadas com Next.js App Router

#### Estrutura do i18n:

```
/lib/i18n/
  index.ts              # Motor de tradução com tokenização
  config.ts             # Configuração de idiomas suportados
  metadata.ts           # Geração de metadados localizados
  next.ts               # Utilidades para Next.js App Router
  /locales/
    pt-br.ts           # Traduções em português brasileiro
    en.ts              # Traduções em inglês
/contexts/
  I18nContext.tsx      # Contexto de internacionalização
/types/
  i18n.ts              # Interfaces TypeScript para i18n
/hooks/
  useI18n.ts           # Hook principal para traduções
  useLocalization.ts   # Hook para localização avançada
  useTranslations.ts   # Hook específico para traduções
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
  /[locale]/                # Rotas localizadas
    layout.tsx              # Layout para rotas localizadas
    page.tsx                # Página localizada
    /artist/[id]/
      layout.tsx            # Layout da página do artista
      page.tsx              # Página individual do artista
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
    /AlbumResults/          # Resultados de álbuns
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
  useI18n.ts                # Hook principal de internacionalização
  useLocalization.ts        # Hook de localização avançada
  useNavigation.ts          # Hook de navegação
  usePrefetchObserver.ts    # Hook de prefetch
  useProgrammaticScroll.ts  # Hook de scroll programático
  useSpotify.ts             # Hooks para API do Spotify
  useTranslations.ts        # Hook específico para traduções
  useUrlInitialization.ts   # Hook de inicialização de URL
/lib
  /i18n/                    # Sistema de internacionalização
    index.ts                # Motor de tradução com tokenização
    config.ts               # Configuração de idiomas
    metadata.ts             # Geração de metadados localizados
    next.ts                 # Utilidades para Next.js
    /locales/
      pt-br.ts              # Traduções em português brasileiro
      en.ts                 # Traduções em inglês
  spotifyAuth.ts            # Gerenciamento de autenticação
/providers
  /Providers/               # Providers do React Query e contextos
/types
  common.ts                 # Tipos comuns e interfaces base
  components.ts             # Tipos de componentes React
  contexts.ts               # Tipos de contextos React
  hooks.ts                  # Tipos de hooks customizados
  i18n.ts                   # Interfaces de internacionalização
  index.ts                  # Barrel exports de todos os tipos
  layouts.ts                # Interfaces de layouts Next.js
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
- ✅ Rotas localizadas com Next.js App Router
- ✅ Metadados SEO localizados
- ✅ Interface moderna e responsiva
- ✅ Tratamento de erros e estados de loading
- ✅ Autenticação automática com a API do Spotify
- ✅ Arquitetura TypeScript bem estruturada e padronizada
- ✅ Organização modular de tipos e interfaces

## 🔧 Scripts disponíveis

- `npm run dev` - Executa em modo de desenvolvimento com Turbopack
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa o linter
- `npm run test` - Executa os testes
- `npm run test:watch` - Executa os testes em modo watch
- `npm run test:coverage` - Executa os testes com relatório de cobertura

## 🌐 Demo

🚀 **[Acesse a demonstração online aqui](https://kanastra-spotify.netlify.app/)**

> **Nota**: A demo está configurada com credenciais públicas do Spotify para demonstração. Para usar suas próprias credenciais, siga as instruções de configuração acima.

## 📚 Saiba mais

Para saber mais sobre as tecnologias utilizadas:

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do React Query](https://tanstack.com/query/latest)
- [API do Spotify](https://developer.spotify.com/documentation/web-api/)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
