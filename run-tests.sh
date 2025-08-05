#!/bin/bash

# Instalar dependências de teste
echo "📦 Instalando dependências de teste..."
npm install --save-dev @testing-library/react@^14.1.2 @testing-library/jest-dom@^6.1.5 @testing-library/user-event@^14.5.1 @types/jest@^29.5.8 jest@^29.7.0 jest-environment-jsdom@^29.7.0

# Executar testes específicos
echo "🧪 Executando testes unitários..."

echo "✅ Testes do sistema de i18n..."
npm test -- --testPathPattern=i18n.test.ts

echo "✅ Testes de autenticação Spotify..."
npm test -- --testPathPattern=spotifyAuth.test.ts

echo "✅ Testes do hook useNavigation..."
npm test -- --testPathPattern=useNavigation.test.ts

echo "✅ Testes do AppStateProvider..."
npm test -- --testPathPattern=AppStateProvider.test.tsx

echo "✅ Testes do componente SearchForm..."
npm test -- --testPathPattern=SearchForm.test.tsx

echo "✅ Testes dos componentes de estado..."
npm test -- --testPathPattern=StateComponents.test.tsx

echo "✅ Testes dos hooks do Spotify API..."
npm test -- --testPathPattern=useSpotify.test.tsx

echo "🎯 Executando todos os testes..."
npm test

echo "📊 Gerando relatório de cobertura..."
npm run test:coverage

echo "✨ Testes concluídos!"
