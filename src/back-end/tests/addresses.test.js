import app from '../app.js';
import request from 'supertest';
//import { AddressModel } from '../db.js';

describe("GET /Addresses", () => {
    let res

    beforeEach(async() => {
        res = await request(app).get('/addresses')
    });

    test('Returns JSON content', async () => {
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toContain('json');
    });

    test('Returns an array', async () => {
        expect(res.body).toBeInstanceOf(Array);
    });
    
    test('Array has 5 elements or more', async () => {
        expect(res.body.length).toBeGreaterThanOrEqual(5);
    });

    test('Contains seven unique elements as key:value pairs', async () => {
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitNumber: '1' }),
                expect.objectContaining({ streetNumber: '249' }),
                expect.objectContaining({ streetName: 'George Street' }),
                expect.objectContaining({ postcode: '2017' }),
                expect.objectContaining({ country: 'Australia' })
            ])
        );
    });
});

describe("GET /addresses/:id", () => {
    let res;

    beforeEach(async () => {
        res = await request(app).get('/addresses/65e45ae62492001791c4c9f8');
    });

    test('Returns JSON content and gets existing address by ID', async () => {
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toContain('json');
        expect(res.body).toEqual(expect.objectContaining({
            _id: expect.any(String)
        }));
    });

    test('Get non-existing address by wrong ID', async () => {
        const nonExistingAddressId = '65e42121cd416f4c98ebazz';
        const res = await request(app).get(`/addresses/${nonExistingAddressId}`);
        expect(res.body).toEqual({ error: 'Internal Server Error' });
    });
});


