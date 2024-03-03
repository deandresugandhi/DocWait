import app from '../app.js';
import request from 'supertest';

describe("GET /clinic", () => {
    let res

    beforeEach(async() => {
        res = await request(app).get('/clinic')
    });

    test('Returns JSON content', async () => {
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toContain('json');
    });

    test('Returns an array', async () => {
        expect(res.body).toBeInstanceOf(Array);
    });
    
    test('Array has 1 elements ', async () => {
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });

    test('Contains one unique elements as key:value pairs', async () => {
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({name: 'Waterloo Medical Centre' }),
            ])
        );
    });
});