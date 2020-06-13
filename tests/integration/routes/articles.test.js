const debug = require('debug')('app: tests/articles.test.js');
const mongoose = require('mongoose');
const request = require('supertest');
const { Article } = require('../../../models/article');
const { expectCt } = require('helmet');

let server;
describe('/api/articles', () => {
    let article;
    beforeEach( () => {
        server = require('../../../index');     

        article = {
            title:'Amazing article 1',
            summary: 'Amazing summary1',
            published_status: true,
            // FIXME: Use moment
            published_date: Date.now(),
        };
    });

    afterEach( async () => {
        await Article.deleteMany({});
        await server.close();
    });
   
    describe('GET /', () => {
        it('should return all articles ', async () => {
            await Article.insertMany([article]);

            const response = await request(server).get('/api/articles');
            debug(response.body);
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
        });
        
    });

    describe('POST /', () => {
        it('should return 400 status code if validation req.body fails', async () => {
            article.title = 'a';
            const response = await request(server)   
                .post('/api/articles/')
                .send(article);

            expect(response.status).toBe(400);
        });

        it('should save the new article if user input is valid', async () => {
            await request(server)   
                .post('/api/articles/')
                .send(article);

            const saved_article =  await Article.findOne({title: article.title});    
            expect(saved_article).toBeTruthy();                       
        });
        
    });
});