import app from '../app.js';
import request from 'supertest';

describe("GET /patients", () => {
    let res

    beforeEach(async() => {
        res = await request(app).get('/patients')
    });

    test('Returns JSON content', async () => {
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toContain('json');
    });

    test('Returns an array', async () => {
        expect(res.body).toBeInstanceOf(Array);
    });
    
    test('Array has 5 elements ', async () => {
        expect(res.body.length).toBeGreaterThanOrEqual(5);
    });

    test('Contains one unique elements as key:value pairs', async () => {
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({firstName: 'Laura'}),
                expect.objectContaining({lastName: 'Cordoba'}),
                expect.objectContaining({phoneNumber: '0421547777'})
            ])
        );
    });
});

describe("GET /patients/:id", () => {
    let res;

    beforeEach(async () => {
        res = await request(app).get('/patients/65e2a00cfeba5336f6627048');
    });

    test('Returns JSON content and gets existing patients by ID', async () => {
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toContain('json');
        
        expect(res.body).toEqual(expect.objectContaining({
            _id: expect.any(String)
        }));
    });

    test('Get non-existing address by wrong ID', async () => {
        const nonExistingpatientId = '65e42121cd416f4c98ebazz'
        const res = await request(app).get(`/patients/${nonExistingpatientId}`);
        expect(res.body).toEqual({ error: 'Internal Server Error' });
    });
});
