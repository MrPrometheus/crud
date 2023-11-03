import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {create} from "../../api";

interface IFormType {
    tnved: string,
    width: number,
    length: number,
    height: number,
    sex: string,
    color: string,
    subject: string,
    style: string,
    complectation: string,
    brend: string,
    vendorCode: string,
    techSize: string,
    wbSize: string,
    price: number,
    skus: string,
}

const schema = yup.object().shape({
    tnved: yup.string().required(),
    width: yup.number().required(),
    length: yup.number().required(),
    height: yup.number().required(),
    sex: yup.string().required(),
    color: yup.string().required(),
    subject: yup.string().required(),
    style: yup.string().required(),
    complectation: yup.string().required(),
    brend: yup.string().required(),
    vendorCode: yup.string().required(),
    techSize: yup.string().required(),
    wbSize: yup.string().required(),
    price: yup.number().required(),
    skus: yup.string().required(),
});

export const AddCard = () => {
    const { reset, register, handleSubmit, watch, formState: { errors } } = useForm<IFormType>({resolver: yupResolver(schema)});

    const onSubmit = handleSubmit((data) => {
        create({
            vendorCode: data.vendorCode,
            sizes: {wbSize: data.wbSize, techSize: data.techSize, price: data.price, skus: data.skus.split(",")},
        characteristics: {
                "Пол": data.sex.split(","),
            "Высота упаковки": data.height,
            "ТНВЭД": data.tnved,
            "Длина упаковки": data.length,
            "Ширина упаковки": data.width,
            "Бренд": data.brend.split(","),
            "Цвет": data.color.split(","),
            "Стилистика": data.style.split(","),
            "Комплектация": data.complectation.split(","),
            "Предмет": data.subject,
        }}).then(() => {
            alert("Карточка создана!")
            reset()
        })
    });

    return (
        <form className="submit-form" onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="title">ТНВЭД</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("tnved")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Ширина упаковки</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("width")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Длина упаковки</label>
                <input
                    type="number"
                    className="form-control"
                    {...register("length")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Высота упаковки</label>
                <input
                    type="number"
                    className="form-control"
                    {...register("height")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Пол</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("sex")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Цвет</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("color")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Предмет</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("subject")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Стилистика</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("style")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Комплектация</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("complectation")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Бренд</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("brend")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">vendorCode</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("vendorCode")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">techSize</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("techSize")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">wbSize</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("wbSize")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">price</label>
                <input
                    type="number"
                    className="form-control"
                    {...register("price")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">skus</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("skus")}
                />
            </div>

            <button className="btn btn-success" type="submit">
                Добавить
            </button>
        </form>
    )
}