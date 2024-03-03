import app from '../app.js';
import request from 'supertest';
import {OpeningHoursModel} from '../db.js';

describe("GET /opening_hours", () => {
    let res

    beforeEach(async() => {
        res = await request(app).get('/opening_hours')
    });

    test('Returns JSON content', async () => {
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toContain('json');
    });

    test('Returns an array', async () => {
        expect(res.body).toBeInstanceOf(Array);
    });
    
    test('Array has 7 elements', async () => {
        expect(res.body.length).toBeGreaterThanOrEqual(7);
    });

    test('Contains 4 unique elements as key:value pairs', async () => {
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ day: 'Friday' }),
                expect.objectContaining({ isOpen: true }),
                expect.objectContaining({ openingTime: '07:00 AM' }),
                expect.objectContaining({ closingTime: '06:00 PM' })
            ])
        );
    });
});

describe("GET /opening_hours/:id", () => {
    let res;

    beforeEach(async () => {
        res = await request(app).get('/opening_hours/65e2a00dfeba5336f662705f');
    });

    test('Returns JSON content', async () => {
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toContain('json');
    });

    test('Get existing opening day details by ID', async () => {
        expect(res.body).toEqual(expect.objectContaining({
                _id: expect.any(String)})
                );
        });
    });

    test('Get non-existing address by wrong ID', async () => {
        const nonExistingOpeningId = '65e2a00cfeba5336f6627048'
        const res = await request(app).get(`/opening_hours/${nonExistingOpeningId}`);
        expect(res.body).toEqual({ error: 'Entry not found' });
    });

describe("PUT /opening_hours/:id", () => {
        let openingId
    
        beforeEach(async () => {
            const existingOpening = await OpeningHoursModel.findOne();
            openingId = existingOpening._id;
        });
    
        test('Update existing opening day', async () => {
            const updatedOpeningData = {
                "closingTime": "0000"
              };
    
            const res = await request(app)
                .put(`/opening_hours/65e2a00dfeba5336f6627065`)
                .send(updatedOpeningData);
    
            expect(res.status).toBe(200);
            expect(res.body).toEqual(expect.objectContaining(updatedOpeningData));
        });
    
        test('Update non-existing opening day', async () => {
            const res = await request(app)
                .put('/opening_hours/65e2a00cfeba5336f6627047')
                .send(); 
    
            expect(res.status).toBe(404);
            expect(res.body).toEqual({ error: 'Openings not found' });
        });
    });