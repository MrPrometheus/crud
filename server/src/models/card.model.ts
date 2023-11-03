
import {Schema, model} from "mongoose"

export interface ICharacteristics {
    "ТНВЭД": String
    "Ширина упаковки": Number
    "Длина упаковки": Number
    "Высота упаковки": Number
    "Пол": Array<String>
    "Цвет": Array<String>
    "Предмет": String
    "Стилистика": Array<String>
    "Комплектация": Array<String>
    "Бренд": Array<String>
}

export interface ICard {
    characteristics: ICharacteristics
    vendorCode: String
    sizes: {techSize: String, wbSize: String, price: Number, skus: Array<String>}
}

export const cardSchema = new Schema<ICard>({
    characteristics: {
        "ТНВЭД": String,
        "Ширина упаковки": Number,
        "Длина упаковки": Number,
        "Высота упаковки": Number,
        "Пол": Array<String>,
        "Цвет": Array<String>,
        "Предмет": String,
        "Стилистика": Array<String>,
        "Комплектация": Array<String>,
        "Бренд": Array<String>,
    },
    sizes: {techSize: String, wbSize: String, price: Number, skus: Array<String>},
    vendorCode: String,
},
    {
        timestamps: true,
        versionKey: false,
        id: true,
        toJSON: {transform(doc, ret) {ret.id = ret._id
            delete ret._id}}});

export const cardModel = model<ICard>('Card', cardSchema);