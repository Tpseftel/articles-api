const debug = require('debug')('app: tests/articles.test.js');
const mongoose = require('mongoose');
const request = require('supertest');
const { Article } = require('../../../models/article');
const moment  = require('moment');

let server;
describe('/api/articles', () => {
    debug(`App Enviroment: ${process.env.NODE_ENV}`);

    let article;
    beforeEach( () => {
        server = require('../../../index');     

        article = {
            title:'Amazing article 1',
            summary: 'Amazing summary 1',
            published_status: true,
            published_date: moment.now(),
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


    describe('PUT /:id', () => {
        it('should return 400 if the given article Id has bad format', async () => {
            const article_id = '1';
            const response =  await request(server)   
                    .put(`/api/articles/${article_id}`)
                    .send({ title: 'Article updated' });

                expect(response.status).toBe(400);
        });
        it('should return 404 id given article not found ', async () => {
            let saved_article  = new Article(article);
            await saved_article.save();

            const article_id = mongoose.Types.ObjectId();
            const response =  await request(server)   
                .put(`/api/articles/${article_id}`)
                .send({ title: 'Article updated' });

                expect(response.status).toBe(404);
        });
        it('should return 400 if the given new value is invalid', async () => {
            let saved_article  = new Article(article);
            saved_article = await saved_article.save();
            const title = 'a';

            const response =  await request(server)   
            .put(`/api/articles/${ saved_article._id }`)
            .send({ title });

            expect(response.status).toBe(400);
        });

        it('should  update the article  with the new value', async () => {
            let saved_article  = new Article(article);
            saved_article = await saved_article.save();

            const updated_title = 'Updated Title';
            const response =  await request(server)   
                .put(`/api/articles/${saved_article._id}`)
                .send({ 
                    title: updated_title 
                });

            const db_article = await Article.findById(saved_article._id);
            debug(`db_article: ${db_article}`);

            expect(db_article.title).toMatch(updated_title);
        });
    });


});