# Testing Architecture

This project uses Vitest with a jsdom environment.

## Structure

- `tests/unit/`: pure utilities, stores, services, repositories.
- `tests/component/`: reusable component render output and accessibility-oriented markup checks.
- `tests/integration/`: SPA routing, page-level interactions, localStorage-backed flows.
- `tests/setup/`: shared test environment setup.

## Commands

- `npm run test`: run Vitest in watch mode.
- `npm run test:run`: run all tests once.
- `npm run test:unit`: run unit tests.
- `npm run test:component`: run component tests.
- `npm run test:integration`: run integration tests.
- `npm run test:coverage`: run coverage reports.

## Guidelines

Prefer testing stable public behavior over implementation details. Keep unit tests small, component tests focused on generated markup and accessibility attributes, and integration tests focused on user-visible SPA flows.
