# Nexontis recruitment task – Playwright + TypeScript + Allure

Single repository with separate UI and API suites using Playwright Test and Allure.

## Prerequisites

- Node.js 18+
- (Optional) Java 8+ if you want to use `allure serve` locally (Allure 2).

## Install

npm ci
npx playwright install --with-deps

## Quick start (required)

1) Install project dependencies

npm install
npx playwright install

2) Run tests

UI tests (example):

npm run test:ui

API tests (example):

npm run test:api

Or run all tests with Playwright directly:

npx playwright test

3) View results (Allure)

After tests run, Allure results are saved to `./allure-results` by the reporter. To generate and view the report locally:

npm run allure:generate
npm run allure:open

Or serve immediately (generate + open):

npm run allure:serve

Notes
- If you prefer the direct Allure CLI (needs Java), you can also run `npx allure serve ./allure-results`.
- It's recommended to clean `./allure-results` before a run to avoid mixing previous results: `Remove-Item .\\allure-results\\* -Recurse -Force`.
