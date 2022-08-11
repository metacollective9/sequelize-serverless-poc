import { Handler } from "aws-lambda";
import { db, getDBInstance } from "../../db/db";
import { Author } from "../../db/models/author";
import { internalServerError, sendResponseBody } from "../../util/response";


export const getAuthors: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        let authors: Array<Author> = await DB.author.findAll({
            include: [
                DB.book
            ]
        });
        
        const message = authors ? `Successfully found ${authors.length} authors` : 'No details found'

        return sendResponseBody({
            origin: event.headers.origin,
            resCode: 200,
            success: authors,
            message: message,
        });

    } catch (error) {
        return internalServerError(error);
    }
}

export const getAuthor: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        const id:number = event.pathParameters.id;
        let author: Array<Author> = await DB.author.findOne({
            where: { 
               id,
            },
            include: [
                DB.book,
            ]
        });
        
        const message:string = author ? `Author details found` : 'No details found'

        return sendResponseBody({
            origin: event.headers.origin,
            resCode: 200,
            success: author,
            message: message,
        });

    } catch (error) {
        return internalServerError(error);
    }
}

export const addAuthor: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        let body: Author = JSON.parse(event.body);
        
        const author = await DB.author.create({ ...body });

        return sendResponseBody({
            origin: event.headers.origin,
            resCode: 200,
            success: author,
            message: "Author added successfully",
        });

    } catch (error) {
        return internalServerError(error);
    }
}

export const updateAuthor: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        let author: Author = JSON.parse(event.body);
        
        await DB.author.update({ ...author }, { where: { id: author.id } });
        
        return sendResponseBody({
            origin: event.headers.origin,
            resCode: 200,
            success: author,
            message: "Author updated successfully",
        });

    } catch (error) {
        return internalServerError(error);
    }
}

export const deleteAuthor: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        const id:number = event.pathParameters.id;
        await DB.author.destroy({
            where: { 
                id,
            }
        });
        
        const message:string = `Successfully deleted author with ID: ${id}`

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