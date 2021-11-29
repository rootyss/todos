start:
	npx webpack serve
build-prod:
	npx webpack --mode=production --node-env=production
build-dev:
	npx webpack --mode=development
lint:
	npx eslint . --ext js,jsx
lint-fix:
	npx eslint . --fix --ext js,jsx