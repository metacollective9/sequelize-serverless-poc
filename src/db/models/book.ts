import { Model, DataTypes, Sequelize, IntegerDataType } from "sequelize";
import { db } from "../db";
import { BOOK_STUB } from "../stubs/book";

export class Book extends Model {
  public isbn: number;
  public title : string;
  public published_at: Date;
  public publisher_id: number;
  public Authors: Array<number>
}

export async function initBook(sequelize: Sequelize) {
  sequelize.define('book',
    {
      isbn: {
        type: new DataTypes.BIGINT,
        primaryKey:true,
        allowNull: false
      },
      title: {
        type: new DataTypes.STRING(256),
        allowNull: false
      },
      published_at: {
        type: new DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: "book",
      modelName: "Book",
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    }
  );

}

export async function seedBook(DB: db){
    
  const books = await DB.book.findAndCountAll() 
  
  if(!books.count){
    const data: Array<Pick<Book, "isbn" | "title" | "published_at" | "publisher_id" | "Authors">>  = BOOK_STUB;
    for (let book of data) {
      const _book = await DB.book.create({ ...book });
      await _book.setAuthors(book.Authors);
    }
  }
}