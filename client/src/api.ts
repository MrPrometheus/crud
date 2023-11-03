import axios from "axios";

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

const baseApi = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
})

export const getAll = () => {
    return baseApi.get("/cards");
}

export const get = (id: string) => {
    return baseApi.get(`/cards/${id}`);
}

export const create = (data: ICard) => {
    return baseApi.post("/cards", data);
}

export const update = (id: string, data: ICard) => {
    return baseApi.put(`/cards/${id}`, data);
}

export const deleteOne = (id: string) => {
    return baseApi.delete(`/cards/${id}`);
}

export const deleteAll = () => {
    return baseApi.delete(`/cards`);
}
export const findByText = (text: string) => {
    return baseApi.get(`/cards?tnved=${text}`);
}

export default baseApi