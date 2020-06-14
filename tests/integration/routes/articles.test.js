const debug = require('debug')('app: tests/articles.test.js');
const mongoose = require('mongoose');
const request = require('supertest');
const { Article } = require('../../../models/article');
const moment  = require('moment');
const { Author } = require('../../../models/author');
const jwt = require('jsonwebtoken');

let server;
describe('/api/articles', () => {
    debug(`App Enviroment: ${process.env.NODE_ENV}`);

    beforeEach( () => {
        server = require('../../../index');     
    });

    afterEach( async () => {
        await Article.deleteMany({});
        await server.close();
    });

    let article;
    let token;
    function execution() {
        article = {
            title:'Amazing article 1',
            summary: 'Amazing summary 1',
            published_status: true,
            published_date: moment.now(),
        };

        token =  new Author().generateAuthToken();
    }
   
    describe('GET /', () => {
        it('should return all articles ', async () => {
            execution();
            await Article.create(article);

            const response = await request(server).get('/api/articles');

            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
        });
        
    });

    describe('POST /', () => {
        it('should return 400 status code if validation req.body fails', async () => {
            execution();
            article.title = 'a';

            const response = await request(server)   
                .post('/api/articles/')
                .set('x-auth-token', token)
                .send(article);

            expect(response.status).toBe(400);
        });

        it('should save the new article if user input is valid', async () => {
            execution();
            await Article.create(article);

            await request(server)   
                .post('/api/articles/')
                .set('x-auth-token', token)
                .send(article);

            const saved_article =  await Article.findOne({title: article.title});    
            expect(saved_article).toBeTruthy();                       
        });
        
    });

    describe('PUT /:id', () => {
        it('should return 400 if the given article Id has bad format', async () => {
            execution();
            const article_id = '1';

            const response =  await request(server)   
                    .put(`/api/articles/${article_id}`)
                    .set('x-auth-token', token)
                    .send({ title: 'Article updated' });

                expect(response.status).toBe(400);
        });

        it('should return 404 id given article not found ', async () => {
            execution();
            const article_id = mongoose.Types.ObjectId();
            
            const response =  await request(server)   
                .put(`/api/articles/${article_id}`)
                .set('x-auth-token', token)
                .send({ title: 'Article updated' });

                expect(response.status).toBe(404);
        });
        
        it('should return 400 if the given new value is invalid', async () => {
            execution();
            let saved_article  =  await Article.create(article);
            const title = 'a';

            const response =  await request(server)   
            .put(`/api/articles/${ saved_article._id }`)
            .set('x-auth-token', token)
            .send({ title });

            expect(response.status).toBe(400);
        });

        it('should  update the article  with the new value', async () => {
            execution();
            let saved_article  = await Article.create(article);
            const updated_title = 'Updated Title';

            await request(server)   
                .put(`/api/articles/${saved_article._id}`)
                .set('x-auth-token', token)
                .send({ 
                    title: updated_title 
                });

            const db_article = await Article.findById(saved_article._id);
            debug(`db_article: ${db_article}`);

            expect(db_article.title).toMatch(updated_title);
        });
    });


});