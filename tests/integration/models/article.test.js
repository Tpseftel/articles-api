const { Article } = require('../../../models/article');
const mongoose = require('mongoose');

beforeAll(async () => {
    console.log(`App Enviroment: ${process.env.NODE_ENV}`);
    require('../../../startup/db')();
});

afterAll(() => {
    mongoose.connection.close();
});

describe('Article Mongoose Model Schema', () => {
    afterEach(async () => {
        await Article.deleteMany({});
    });

    it('should save the player if the given article is valid', async() => {
        let article = new Article({
            title:'Amazing First Article',
            summary: 'This is the amazing article',
            published_status: true,
            published_date: '12/06/2020'
        });
        await article.save();

        const db_article = await Article.findOne({ title: 'Amazing First Article' });

        expect(db_article).toHaveProperty('title', article.title);
        expect(db_article).toHaveProperty('summary', article.summary);
    });

    it('should throw  an error if data is invalid',async () => {
        let article = new Article({
            title: '',
            summary: 'This is the amazing article',
            published_status: true,
            published_date: '12/06/2020'
        });
        let err;
        try {
            await article.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeDefined();
    });
    
});

