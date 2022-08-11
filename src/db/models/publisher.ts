import { Model, DataTypes, Sequelize } from "sequelize";
import { db } from "../db";
import { PUBLISHER_STUB } from "../stubs/publisher";

export class Publisher extends Model {
  public id: number;
  public name : string;
  public address : string;
}

export async function initPublisher(sequelize: Sequelize) {
  sequelize.define('publisher',
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
        type: new DataTypes.STRING(512),
        allowNull: true
      }
    },
    {
      tableName: "publisher",
      modelName: "Publisher",
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    }
  );

}

export async function seedPublisher(DB: db){
    
  const publishers = await DB.publisher.findAndCountAll() 
  
  if(!publishers.count){
    const data: Array<Pick<Publisher, "id" | "name" | "address">> = PUBLISHER_STUB;
    return await DB.publisher.bulkCreate(data, { returning: true });
  }

}