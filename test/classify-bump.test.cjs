const assert = require('node:assert/strict')
const test = require('node:test')

const { classify } = require('../scripts/classify-bump.cjs')

function spec(properties, description = 'List items') {
  return {
    openapi: '3.0.0',
    paths: {
      '/items': {
        get: {
          description,
          responses: {
            200: {
              content: {
                'application/json': {
                  schema: { type: 'object', properties, required: ['id'] },
                },
              },
            },
          },
        },
      },
    },
    components: {},
  }
}

test('surface changes classify as none, patch, minor, or major', () => {
  const id = { id: { type: 'number' } }
  const idAndName = { ...id, name: { type: 'string' } }
  assert.equal(classify('fixture', spec(id), spec(id)), 'none')
  assert.equal(classify('fixture', spec(id), spec(id, 'List the available items')), 'patch')
  assert.equal(classify('fixture', spec(id), spec(idAndName)), 'minor')
  assert.equal(classify('fixture', spec(idAndName), spec(id)), 'major')
})
