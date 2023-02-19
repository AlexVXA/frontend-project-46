install: 
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

manual-test:
	gendiff __tests__/__fixtures__/example1.json __tests__/__fixtures__/example2.json
	
test:
	npx jest

test-coverage:
	npx jest --coverage --coverageProvider=v8

.PHONY: test
