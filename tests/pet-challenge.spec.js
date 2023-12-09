const {test, expect} = require('@playwright/test')
const petData = require('../data/newPet.json')
const petUpdateData = require('../data/newPet.json')
test('Adding a pet', async ({request})=> {
    const resonse = await request.post('pet',
    {
        data: petData
    })
    expect(resonse.status()).toBe(200)
})

test('Check that pet was added', async ({request})=> {
    const resonse = await request.get(`pet/${petData.id}`)
    let json = await resonse.json()
    let peName = petData.name
    let petNameJson = json.name
    expect(peName).toBe(petNameJson)
})

test('Update a pet', async ({request})=> {
    const resonse = await request.put('pet',
    {
        data: petUpdateData
    })
    expect(resonse.status()).toBe(200)
})

test('Check that pet was Updated', async ({request})=> {
    const resonse = await request.get(`pet/${petUpdateData.id}`)
    let json = await resonse.json()
    let peName = petData.name
    let petNameJson = json.name
    expect(peName).toBe(petNameJson)
})

test('Delete a pet', async ({request})=> {
    const resonse = await request.delete(`pet/${petUpdateData.id}`)
    expect(resonse.status()).toBe(200)
})

test('Check that pet was Deleted', async ({request})=> {
    const resonse = await request.get(`pet/${petUpdateData.id}`)
    let json = await resonse.json()
    expect(resonse.status()).toBe(404)
    expect(json.message).toBe("Pet not found")
})
