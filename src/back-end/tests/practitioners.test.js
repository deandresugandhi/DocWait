import app from '../app.js';
import request from 'supertest';


describe("GET /practitioners", () => {
    let res

    beforeEach(async() => {
        res = await request(app).get('/practitioners')
    });

    test('Returns JSON content', async () => {
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toContain('json');
    });

    test('Returns an array', async () => {
        expect(res.body).toBeInstanceOf(Array);
    });
    
    test('Array has 2 elements', async () => {
        expect(res.body.length).toBeGreaterThanOrEqual(2);
    });

    test('Contains 4 unique elements as key:value pairs', async () => {
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ firstName: 'Rajesh' }),
                expect.objectContaining({ lastName: 'Patel' }),
                expect.objectContaining({ phoneNumber: '9876543210' }),
            ])
        );
    });
});

describe("GET /practitioners/:id", () => {
    let res;

    beforeEach(async () => {
        res = await request(app).get('/practitioners/65e45ae72492001791c4ca06');
    });

    test('Returns JSON content and gets existing practitioner by ID', async () => {
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toContain('json');
        
        expect(res.body).toEqual(expect.objectContaining({
            _id: expect.any(String)
        }));
    });
});

