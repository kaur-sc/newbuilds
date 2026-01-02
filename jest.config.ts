export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\.(ts|tsx)?$': 'ts-jest',
        '^.+\.(js|jsx)$': 'babel-jest',
    },
};