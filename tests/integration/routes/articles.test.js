const debug = require('debug')('app: tests/articles.test.js');
const mongoose = require('mongoose');
const request = require('supertest');
const { Article } = require('../../../models/article');

let server;
describe('/api/articles', () => {
    describe('Name of the group', () => {
        beforeEach( () => {
            server = require('../../../index');     
        });

        afterEach( async () => {
            await Article.deleteMany({});
            await server.close();
        });

        describe('GET /', () => {

            it('should return all articles ', async () => {
                const article1 = {
                    title:'Amazing article 1',
                    summary: 'Amazing summary1',
                    published_status: true,
                    // FIXME: Use moment
                    published_date: Date.now(),
                };
                const article2 = {
                    title: 'Amazing article 2',
                    summary: 'Amazing summary 2',
                    published_status: false,
                    published_date: Date.now(),
                };

                await Article.insertMany([article1, article2]);

                const response = await request(server).get('/api/articles');
                expect(response.status).toBe(200);
                debug(response.body);
                expect(response.body.length).toBeGreaterThan(1);
            });
            
        });

    });
    
});