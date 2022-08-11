import { Sequelize } from "sequelize";
import { Author } from "../db/models/author";
import { Book } from "../db/models/book";
import { Publisher } from "../db/models/publisher";

export interface dbInterface {
  // Sequelize ORM object
  sequelize: Sequelize;
  // Use this function to establish connection with DB
  authenticate: Function;
  // Use this function to create associations between tables
  associate: Function;
  // Use this function to prefill data into tables when empty
  seed: Function;
  // Models for this project
  book: Book;
  author: Author;
  publisher: Publisher;
}
