import { http, HttpResponse } from 'msw'

export const handlers = [
    http.post('https://t3a2.onrender.com/addresses/create', async ({request}) => {
        const responseBody  = await request.json()
        return HttpResponse.json(
            {
                _id: '1',
                unitNumber: responseBody.unitNumber,
                streetNumber: responseBody.streetNumber,
                streetName: responseBody.streetName,
                suburb: responseBody.suburb,
                state: responseBody.state,
                postcode: responseBody.postcode,
                country: responseBody.country
            }
        )
        }),
    http.post('https://t3a2.onrender.com/patients/create', async ({request}) => {
        const responseBody  = await request.json()
        return HttpResponse.json(responseBody)
    }),
    http.post('https://t3a2.onrender.com/practitioners/create', async ({request}) => {
        const responseBody  = await request.json()
        return HttpResponse.json(responseBody)
    }),
]
