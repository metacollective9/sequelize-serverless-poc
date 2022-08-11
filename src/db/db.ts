import * as pg from 'pg';
import { Sequelize } from 'sequelize';
import { dbInterface } from '../interfaces/dbInterface';
import { initAuthor, seedAuthor } from './models/author';
import { initBook, seedBook } from './models/book';
import { initPublisher, seedPublisher } from './models/publisher';


export class db implements dbInterface {

    sequelize: Sequelize;
    book: any;
    author: any;
    publisher: any;

    constructor() {

        this.sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: "postgres",
            dialectModule: pg,
            logging: false,
        });

        initBook(this.sequelize);
        initAuthor(this.sequelize);
        initPublisher(this.sequelize);
        this.book = this.sequelize.models.book;
        this.author = this.sequelize.models.author;
        this.publisher = this.sequelize.models.publisher;
    }

    async associate() {
        // Book has many authors (1 to n)
        this.book.belongsToMany(this.author, { through: 'book_author' });
        // Book has 1 publisher (1 to 1)
        this.book.belongsTo(this.publisher, { foreignKey: 'publisher_id' });
        // Author has many books (1 to n)
        this.author.belongsToMany(this.book, { through: 'book_author' });
        // Publisher has many books (1 to n)
        this.publisher.hasMany(this.book, { foreignKey: 'publisher_id' });
    }

    async seed() {
        await seedAuthor(this);
        await seedPublisher(this);
        await seedBook(this);
    }

    async authenticate() {
        try {

            //Create associations
            await this.associate();

            //Sync DB
            await this.sequelize.sync({ force: false })
                .then(() => console.log('DB Connection established successfully.'))
                .catch(err => console.error(`DB Sequelize Connection Failed: ${err}`));

        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }


}

export const getDBInstance = async () => {
    const DB = new db();
    await DB.authenticate();
    await DB.seed();
    return DB;
}

