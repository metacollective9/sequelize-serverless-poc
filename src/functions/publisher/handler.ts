import { Handler } from "aws-lambda";
import { db, getDBInstance } from "../../db/db";
import { Publisher } from "../../db/models/publisher";
import { internalServerError, sendResponseBody } from "../../util/response";


export const getPublishers: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        let publishers: Array<Publisher> = await DB.publisher.findAll({
            include: [
                DB.book
            ]
        });
        
        const message = publishers ? `Successfully found ${publishers.length} Publishers` : 'No details found'

        return sendResponseBody({
            origin: event.headers.origin,
            resCode: 200,
            success: publishers,
            message: message,
        });

    } catch (error) {
        return internalServerError(error);
    }
}

export const getPublisher: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        const id:number = event.pathParameters.id;
        let Publisher: Array<Publisher> = await DB.publisher.findOne({
            where: { 
                id,
            },
            include: [
                DB.book
            ]
        });
        
        const message:string = Publisher ? `Publisher details found` : 'No details found'

        return sendResponseBody({
            origin: event.headers.origin,
            resCode: 200,
            success: Publisher,
            message: message,
        });

    } catch (error) {
        return internalServerError(error);
    }
}

export const addPublisher: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        let body: Publisher = JSON.parse(event.body);
        
        const publisher = await DB.publisher.create({ ...body });

        return sendResponseBody({
            origin: event.headers.origin,
            resCode: 200,
            success: Publisher,
            message: "Publisher added successfully",
        });

    } catch (error) {
        return internalServerError(error);
    }
}

export const updatePublisher: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        let Publisher: Publisher = JSON.parse(event.body);
        
        await DB.publisher.update({ ...Publisher }, { where: { id: Publisher.id } });
        
        return sendResponseBody({
            origin: event.headers.origin,
            resCode: 200,
            success: Publisher,
            message: "Publisher updated successfully",
        });

    } catch (error) {
        return internalServerError(error);
    }
}

export const deletePublisher: Handler = async (event, _context) => {
    try {
        const DB: db = await getDBInstance();
        const id:number = event.pathParameters.id;
        await DB.publisher.destroy({
            where: { 
                id,
            }
        });
        
        const message:string = `Successfully deleted Publisher with id: ${id}`

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