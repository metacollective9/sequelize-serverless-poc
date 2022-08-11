import { Model, DataTypes, Sequelize } from "sequelize";
import { db } from "../db";
import { AUTHOR_STUB } from "../stubs/author";

export class Author extends Model {
  public id?: number;
  public name: string;
  public address : string;
}

export async function initAuthor(sequelize: Sequelize) {
  sequelize.define('author',
    {
      id: {
        type: new DataTypes.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: new DataTypes.STRING(256),
        allowNull: false
      },
      address: {
        type: new DataTypes.STRING(256),
        allowNull: false
      }
    },
    {
      tableName: "author",
      modelName: "Author",
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    }
  );

}

export async function seedAuthor(DB: db){
    
  const authors = await DB.author.findAndCountAll() 
  
  if(!authors.count){
    const data: Array<Pick<Author, "id" | "name" | "address">> = AUTHOR_STUB;
    return await DB.author.bulkCreate(data, { returning: true });
  }

}