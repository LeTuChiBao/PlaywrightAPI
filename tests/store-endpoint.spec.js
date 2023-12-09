const {test, expect} = require('@playwright/test')
const storeData = require('../data/store-order.json')

test('Adding a new order', async ({ request })=>{
    const resonse = await request.post('store/order',{
        data: storeData
    })
    let resJson = await resonse.json()
    let statusJson = resJson.status
    expect(statusJson).toBe(storeData.status)
    expect(resonse.status()).toBe(200)
})

test('Checkking inventory order', async ({ request })=>{
    const resonse = await request.get(`store/order/${storeData.id}`)
    let resJson = await resonse.json()
    let id = resJson.id
    expect(id).toBe(storeData.id)
    expect(resonse.status()).toBe(200)
})
test('Delete inventory order', async ({ request })=>{
    const resonse = await request.delete(`store/order/${storeData.id}`)
    let resJson = await resonse.json()
    let message = resJson.message
    expect(message).toBe(storeData.id.toString())
    expect(resonse.status()).toBe(200)
})

test('Checkking inventory order after delete', async ({ request })=>{
    const resonse = await request.get(`store/order/${storeData.id}`)
    let resJson = await resonse.json()
    let message = resJson.message
    expect(message).toBe('Order not found')
    expect(resonse.status()).toBe(404)
})