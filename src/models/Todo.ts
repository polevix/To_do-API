import { timeStamp } from "console";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface TodoInstance extends Model {
    id: number;
    title: string;
    done: boolean;
}

export const Todo = sequelize.define<TodoInstance>("todo", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    tableName: "todos",
    timestamps: false
});