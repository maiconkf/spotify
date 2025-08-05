import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
	dir: './',
})

const customJestConfig = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
	},
	maxWorkers: '50%',
	cache: false,
	clearMocks: true,
	resetMocks: true,
	restoreMocks: true,
	testTimeout: 10000,
	detectOpenHandles: true,
	forceExit: true,
	logHeapUsage: true,
}

export default createJestConfig(customJestConfig)
