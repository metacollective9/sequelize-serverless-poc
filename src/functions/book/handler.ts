import { Handler } from "aws-lambda";
import { db, getDBInstance } from "../../db/db";
import { Book } from "../../db/models/book";
import { internalServerError, sendResponseBody } from "../../util/response";

export const getBooks: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        let books: Array<Book> = await DB.book.findAll({
            include: [
                DB.publisher,
                DB.author
            ]
        });
        
        const message = books ? `Successfully found ${books.length} books` : 'No details found'

        return sendResponseBody({
            origin: event.headers.origin,
            resCode: 200,
            success: books,
            message: message,
        });

    } catch (error) {
        return internalServerError(error);
    }
}

export const getBook: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        const isbn:number = event.pathParameters.isbn;
        let book: Array<Book> = await DB.book.findOne({
            where: { 
                isbn: isbn,
            },
            include: [
                DB.publisher,
                DB.author
            ]
        });
        
        const message:string = book ? `Book details found` : 'No details found'

        return sendResponseBody({
            origin: event.headers.origin,
            resCode: 200,
            success: book,
            message: message,
        });

    } catch (error) {
        return internalServerError(error);
    }
}

export const addBook: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        let body: Book = JSON.parse(event.body);
        
        const book = await DB.book.create({ ...body });
        if (body.Authors) {
            await book.setAuthors(body.Authors);
        }

        return sendResponseBody({
            origin: event.headers.origin,
            resCode: 200,
            success: book,
            message: "Book added successfully",
        });

    } catch (error) {
        return internalServerError(error);
    }
}

export const updateBook: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        let book: Book = JSON.parse(event.body);
        
        await DB.book.update({ ...book }, { where: { isbn: book.isbn } });
        
        return sendResponseBody({
            origin: event.headers.origin,
            resCode: 200,
            success: book,
            message: "Book updated successfully",
        });

    } catch (error) {
        return internalServerError(error);
    }
}

export const deleteBook: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        const isbn:number = event.pathParameters.isbn;
        await DB.book.destroy({
            where: { 
                isbn: isbn,
            }
        });
        
        const message:string = `Successfully deleted book with ISBN: ${isbn}`

        return sendResponseBody({
            origin: event.headers.origin,
            resCode: 200,
            success: {},
            message: message,
        });

    } catch (error) {
        return internalServerError(error);
    }
}