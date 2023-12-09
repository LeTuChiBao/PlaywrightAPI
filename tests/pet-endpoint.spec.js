const {test, expect} = require('@playwright/test')
const petData = require('../data/pet.json')
test('Adding a new avalilable pet', async ({ request })=>{
    const resonse = await request.put('pet',{
        data: petData
    })
    console.log(await resonse.json())
    expect(resonse.status()).toBe(200)
})

test('Checking that pet added is sucessfully', async ({ request })=>{
    const resonse = await request.get(`pet/${petData.id}`)
    let json = await resonse.json()
    let peName = petData.category.name
    let petNameJson = json.category.name
    console.log(`Pet Name: ${peName}`)
    console.log(`Pet Name Json : ${petNameJson}`)
    expect(peName).toBe(petNameJson)
})

// test('Available pets', async ({ request })=>{
//     const resonse = await request.get('pet/findByStatus',{
//         params: {
//             'status' : 'available'
//         }
//     })
//     console.log(await resonse.url())
//     expect(resonse.status()).toBe(200)
// })