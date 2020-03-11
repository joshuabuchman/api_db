const { expect } = require('chai')

// ----------- OR --------------
// const chai = require('chai')
// const expect = chai.expect

const db = require('../db')

const { Product} = db.mdoels

describe('data layer', () => 
{
    // it('foo is equal to foo', () =>
    // {
    //     const foo = 'foo'
    //     expect(foo).to.equal('foo')
    // })
    describe('seeded data', () =>
    {
        let seed;
        beforeEach(async() => 
        {
            seed = await db.sync()
        })
        it('there are 4 products', () =>
        {
            expect(seed.products.length).to.equal(4)
        })
        it('one of them has a name bar', async() =>
        {
            const bar = await Product.findOne({ where: {name: 'bar'}})
            expect(bar.name).to.equal('bar')
        })
        it('foo1 has a category of fooCategory', async() =>
        {
            const foo1 = await Product.findOne({ where: {name: 'foo1'}})
            expect(foo1.category).to.equal('fooCategory')
        })
    })
})
describe('routes', () =>
{
    beforeEach( async()=>
    {
        seed = await db.sync()
    })
    describe('GET /api/products', () =>
    {
        it('returns 4 products', async() =>
        {
            const response = await app.get('api/products')
            expect(response.status).to.equal(200)
            expect(response.body.length).to.equal(4)
        })
    })
    describe('GET /api/products', () =>
    {
        it('returns 3 categories', async() =>
        {
            const response = await app.get('api/categories')
            expect(response.status).to.equal(200)
            expect(response.body.length).to.equal(3)
        })
    })
    describe('POST /api/products', () =>
    {
        it('generates a new product', async() =>
        {
            const response = await app.post('api/products')
            expect(response.status).to.equal(201)
        })
    })
    describe('PUT /api/products', () =>
    {
        it('updates a product', async() =>
        {
            const foo1 = seed.products.find( product => product.name === 'foo1')
            const response = (await app.put(`api/products/${foo1.id}`)).setEncoding({ name: 'FOO 1'})
            expect(response.status).to.equal(200)
            expect(response.body.name).to.equal('FOO 1')
        })
    })
    describe('DELETE /api/products', () =>
    {
        it('deletes a product', async() =>
        {
            const foo1 = seed.products.find( product => product.name === 'foo1')
            const response =  await app.delete(`api/products/${foo1.id}`)
            expect(response.status).to.equal(204)
            expect((await Product.findAll()).length).to.equal(4)
        })
    })
})