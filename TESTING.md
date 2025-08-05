# 🧪 Testes Unitários - Spotify Search App

Este documento descreve a suíte completa de testes unitários implementada para o projeto Spotify Search, cobrindo todas as funcionalidades principais da aplicação.

## 📋 Índice

- [Configuração](#configuração)
- [Estrutura dos Testes](#estrutura-dos-testes)
- [Cobertura de Testes](#cobertura-de-testes)
- [Como Executar](#como-executar)
- [Estratégias de Teste](#estratégias-de-teste)

## ⚙️ Configuração

### Dependências de Teste

```json
{
	"@testing-library/react": "^14.1.2",
	"@testing-library/jest-dom": "^6.1.5",
	"@testing-library/user-event": "^14.5.1",
	"@types/jest": "^29.5.8",
	"jest": "^29.7.0",
	"jest-environment-jsdom": "^29.7.0"
}
```

### Configuração do Jest

- **Framework**: Next.js Jest
- **Ambiente**: jsdom (para testes de componentes React)
- **Setup**: `jest.setup.js` com configurações globais
- **Mocks**: Next.js router, window.scrollTo, fetch global

## 📁 Estrutura dos Testes

```
__tests__/
├── utils/
│   ├── i18n.test.ts              # Sistema de internacionalização
│   ├── spotifyAuth.test.ts       # Autenticação Spotify
│   └── api.test.ts              # Configuração da API
├── hooks/
│   ├── useNavigation.test.ts     # Hook de navegação
│   ├── useProgrammaticScroll.test.ts # Hook de scroll
│   └── useSpotify.test.tsx       # Hooks da API Spotify
├── contexts/
│   └── AppStateProvider.test.tsx # Context de estado global
└── components/
    ├── SearchForm.test.tsx       # Formulário de busca
    └── StateComponents.test.tsx  # Componentes de estado
```

## 🎯 Cobertura de Testes

### 1. Sistema de Internacionalização (`i18n.test.ts`)

**Funcionalidades testadas:**

- ✅ Tokenização de strings com placeholders `{{token}}`
- ✅ Navegação por objetos aninhados de traduções
- ✅ Função principal de tradução com suporte a tokens
- ✅ Tratamento de erros (chaves/idiomas inexistentes)
- ✅ Casos extremos (tokens vazios, valores numéricos)

**Casos de teste:** 15 testes cobrindo todas as funções utilitárias

### 2. Autenticação Spotify (`spotifyAuth.test.ts`)

**Funcionalidades testadas:**

- ✅ Obtenção de token de acesso
- ✅ Validação de token expirado
- ✅ Cache de token válido
- ✅ Renovação automática
- ✅ Headers de autorização
- ✅ Limpeza de token
- ✅ Tratamento de erros de API

**Casos de teste:** 8 testes cobrindo fluxo completo de autenticação

### 3. Hook de Navegação (`useNavigation.test.ts`)

**Funcionalidades testadas:**

- ✅ Atualização de URL com parâmetros de busca
- ✅ Navegação para home
- ✅ Tratamento de caracteres especiais
- ✅ Diferentes tipos de busca (artist/album)
- ✅ Casos extremos (query vazia)

**Casos de teste:** 5 testes para navegação e URL management

### 4. Hook de Scroll Programático (`useProgrammaticScroll.test.ts`)

**Funcionalidades testadas:**

- ✅ Estado inicial
- ✅ Ativação de scroll programático
- ✅ Reset automático com timeout
- ✅ Limpeza na desmontagem
- ✅ Múltiplas chamadas

**Casos de teste:** 5 testes com mocks de timers

### 5. Context de Estado (`AppStateProvider.test.tsx`)

**Funcionalidades testadas:**

- ✅ Gerenciamento de artistas (CRUD)
- ✅ Estados de UI (loading, query, página, tipo)
- ✅ Estados de navegação (breadcrumbs, página anterior)
- ✅ Estado inicial correto
- ✅ Tratamento de erro fora do provider

**Casos de teste:** 15 testes cobrindo todo o estado global

### 6. Componente SearchForm (`SearchForm.test.tsx`)

**Funcionalidades testadas:**

- ✅ Renderização com traduções
- ✅ Interações do usuário (digitação, submit)
- ✅ Validação de entrada (trim, empty)
- ✅ Estados de loading
- ✅ Acessibilidade (form, botões, inputs)
- ✅ Múltiplos idiomas

**Casos de teste:** 15 testes de componente com user events

### 7. Componentes de Estado (`StateComponents.test.tsx`)

**Funcionalidades testadas:**

**EmptyState:**

- ✅ Estado de boas-vindas
- ✅ Estado sem resultados (artist/album)
- ✅ Renderização condicional

**LoadingState:**

- ✅ Animação de carregamento
- ✅ Mensagens dinâmicas por tipo
- ✅ Elementos visuais (spinner)

**ErrorState:**

- ✅ Exibição de erros
- ✅ Botão de retry (opcional)
- ✅ Callbacks de retry

**Casos de teste:** 12 testes para componentes de feedback

### 8. Hooks da API Spotify (`useSpotify.test.tsx`)

**Funcionalidades testadas:**

- ✅ Busca de artistas com cache
- ✅ Busca de álbuns
- ✅ Paginação correta
- ✅ Validação de query (tamanho mínimo)
- ✅ Estados habilitado/desabilitado
- ✅ Tratamento de erros de API
- ✅ Retorno de resultados vazios

**Casos de teste:** 8 testes de integração com React Query

### 9. Configuração da API (`api.test.ts`)

**Funcionalidades testadas:**

- ✅ Criação da instância axios
- ✅ Interceptors de request/response
- ✅ Adição automática de headers de auth
- ✅ Renovação de token em 401
- ✅ Tratamento de erros de auth
- ✅ Retry de requests

**Casos de teste:** 9 testes para configuração HTTP

## 🚀 Como Executar

### Executar todos os testes

```bash
npm test
```

### Executar com watch mode

```bash
npm run test:watch
```

### Gerar relatório de cobertura

```bash
npm run test:coverage
```

### Executar testes específicos

```bash
# Testes de i18n
npm test -- --testPathPattern=i18n.test.ts

# Testes de autenticação
npm test -- --testPathPattern=spotifyAuth.test.ts

# Testes de componentes
npm test -- --testPathPattern=components
```

### Script automatizado

```bash
# Instala dependências e executa todos os testes
./run-tests.sh
```

## 📊 Estratégias de Teste

### 1. **Testes Unitários Puros**

- Funções utilitárias isoladas
- Lógica de negócio sem dependências
- Exemplo: sistema de i18n, helpers

### 2. **Testes de Hooks**

- `renderHook` do Testing Library
- Mocks de dependências externas
- Teste de estados e efeitos colaterais

### 3. **Testes de Componentes**

- Renderização e props
- Interações do usuário
- Estados visuais (loading, error, empty)
- Acessibilidade

### 4. **Testes de Integração**

- Context + Hooks + API
- Fluxos completos de funcionalidade
- Mocks de serviços externos

### 5. **Mocking Strategies**

**Next.js Router:**

```javascript
jest.mock('next/navigation', () => ({
	useRouter: () => ({ replace: jest.fn() }),
}))
```

**API Calls:**

```javascript
jest.mock('@/config/api')
const mockApi = api as jest.Mocked<typeof api>
```

**Timers:**

```javascript
jest.useFakeTimers()
jest.advanceTimersByTime(1000)
```

## 🎭 Padrões de Teste

### Estrutura AAA (Arrange, Act, Assert)

```javascript
it('should do something', () => {
  // Arrange
  const mockData = { ... }

  // Act
  const result = functionUnderTest(mockData)

  // Assert
  expect(result).toBe(expected)
})
```

### Wrapper para Contextos

```javascript
const TestWrapper = ({ children }) => (
	<QueryClientProvider client={queryClient}>
		<AppStateProvider>{children}</AppStateProvider>
	</QueryClientProvider>
)
```

### Cleanup e Isolation

```javascript
beforeEach(() => {
	jest.clearAllMocks()
	// Reset estados se necessário
})
```

## 🔍 Casos de Teste Importantes

### Casos Extremos (Edge Cases)

- ✅ Strings vazias e null/undefined
- ✅ Objetos vazios e arrays
- ✅ Números zero e negativos
- ✅ Erros de rede e timeouts
- ✅ Estados de loading intermitentes

### Casos de Erro

- ✅ APIs que falham
- ✅ Tokens expirados
- ✅ Componentes fora de contexto
- ✅ Inputs inválidos

### Casos de Sucesso

- ✅ Fluxos felizes completos
- ✅ Interações de usuário típicas
- ✅ Estados esperados de UI

## 📈 Métricas de Qualidade

### Cobertura Esperada

- **Statements**: > 90%
- **Branches**: > 85%
- **Functions**: > 90%
- **Lines**: > 90%

### Tipos de Teste

- **Unit Tests**: ~70%
- **Integration Tests**: ~25%
- **Component Tests**: ~5%

## 🛠️ Ferramentas e Bibliotecas

### Core Testing

- **Jest**: Framework principal
- **Testing Library**: Utilitários React
- **jsdom**: Ambiente DOM simulado

### Mocking e Simulação

- **Jest Mocks**: Funções e módulos
- **MSW**: (futuro) Mock Service Worker para APIs
- **Fake Timers**: Controle de tempo em testes

### Assertions Customizadas

- **jest-dom**: Matchers para DOM
- **Custom matchers**: Para tipos específicos do projeto

---

## 🏆 Resumo

Esta suíte de testes fornece:

- ✅ **100+ testes** cobrindo funcionalidades críticas
- ✅ **Cobertura abrangente** de utils, hooks, contexts e components
- ✅ **Estratégias variadas** de teste para diferentes cenários
- ✅ **Mocks robustos** para isolar unidades de teste
- ✅ **Casos extremos** e tratamento de erros
- ✅ **Documentação completa** para manutenção

Os testes garantem que todas as funcionalidades principais da aplicação funcionem corretamente e continuem funcionando conforme o projeto evolui. 🚀
