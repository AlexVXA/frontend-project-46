install: 
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

manual-test:
	gendiff __fixtures__/example7.json __fixtures__/example8.json

plain-test:
	gendiff __fixtures__/example7.json __fixtures__/example8.json -f plain

json-test:
	gendiff __fixtures__/example9.yml __fixtures__/example10.yml -f JSON
	
test:
	npx jest

test-coverage:
	npx jest --coverage --coverageProvider=v8

.PHONY: test
