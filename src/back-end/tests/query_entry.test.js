import app from '../app.js';
import request from 'supertest';

describe("GET /entries", () => {
    let res

    beforeEach(async() => {
        res = await request(app).get('/entries')
    });

    test('Returns JSON content', async () => {
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toContain('json');
    });

    test('Returns an array', async () => {
        expect(res.body).toBeInstanceOf(Array);
    });
    
    test('Array has 5 elements ', async () => {
        expect(res.body.length).toBeGreaterThanOrEqual(4);
    });

    test('Contains one unique element as key:value pairs', async () => {
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({queueState: 'In progress' })
            ])
        );
    });
});

describe("GET /entries/:id", () => {
    let res;

    beforeEach(async () => {
        res = await request(app).get('/entries/65e45ae72492001791c4ca0a');
    });

    test('Returns JSON content and gets existing entry by ID', async () => {
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toContain('json');
        
        expect(res.body).toEqual(expect.objectContaining({
            _id: expect.any(String)
        }));
    });

    test('Get non-existing address by wrong ID', async () => {
        const nonExistingpatientId = '65e42121cd416f4c98ebazz'
        const res = await request(app).get(`/entries/${nonExistingpatientId}`);
        expect(res.body).toEqual({ error: 'Internal Server Error' });
    });
});