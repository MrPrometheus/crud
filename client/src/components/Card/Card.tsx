import {useEffect, useState} from "react";
import {create, deleteOne, get, ICard, update} from "../../api";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate, useParams} from "react-router-dom";

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

interface ICardType extends ICard {
    id: string
}

export const Card = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [currentCard, setCurrentCard] = useState<ICardType>()

    useEffect(() => {
        if(id) get(id).then((res) => setCurrentCard(res.data)).catch(() => navigate("/cards"))
    }, [id]);

    const { reset, register, handleSubmit, watch, formState: { errors }, getValues } = useForm<IFormType>({resolver: yupResolver(schema)});

    const onSubmit = handleSubmit((data) => {
        if(id) update(id, {
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
            if(id) get(id).then((res) => setCurrentCard(res.data)).catch(() => navigate("/cards"))
            alert("Карточка отредактирована!")
        })
    });

    const handleDelete = () => {
        if(id) deleteOne(id).then(() => {
            navigate("/cards")
        })
    }

    return (
        <div>
            {currentCard && (
                <div className="edit-form">
                <h4>Карточка</h4>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">ТНВЕД</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={currentCard.characteristics["ТНВЭД"] as string}
                            {...register("tnved")}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Ширина упаковки</label>
                        <input
                            type="number"
                            className="form-control"
                            defaultValue={currentCard.characteristics["Ширина упаковки"] as number}
                            {...register("width")}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Длина упаковки</label>
                        <input
                            type="number"
                            className="form-control"
                            defaultValue={currentCard.characteristics["Длина упаковки"] as number}
                            {...register("length")}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Высота упаковки</label>
                        <input
                            type="number"
                            className="form-control"
                            defaultValue={currentCard.characteristics["Высота упаковки"] as number}
                            {...register("height")}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Пол</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={currentCard.characteristics["Пол"].join(",")}
                            {...register("sex")}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Цвет</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={currentCard.characteristics["Цвет"].join(",")}
                            {...register("color")}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Предмет</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={currentCard.characteristics["Предмет"] as string}
                            {...register("subject")}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Стилистика</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={currentCard.characteristics["Стилистика"].join(",")}
                            {...register("style")}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Комплектация</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={currentCard.characteristics["Комплектация"].join(",")}
                            {...register("complectation")}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Бренд</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={currentCard.characteristics["Бренд"].join(",")}
                            {...register("brend")}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">vendorCode</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={currentCard.vendorCode as string}
                            {...register("vendorCode")}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">techSize</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={currentCard.sizes.techSize as string}
                            {...register("techSize")}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">wbSize</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={currentCard.sizes.wbSize as string}
                            {...register("wbSize")}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">price</label>
                        <input
                            type="number"
                            className="form-control"
                            defaultValue={currentCard.sizes.price as number}
                            {...register("price")}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">skus</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={currentCard.sizes.skus.join(",")}
                            {...register("skus")}
                        />
                    </div>
                    <button
                        className="badge badge-danger mr-2"
                        onClick={handleDelete}
                        style={{color: "black", background: "yellow"}}
                    >
                        Удалить
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        style={{color: "black", background: "yellow"}}
                    >
                        Обновить
                    </button>
                </form>
            </div>)}
        </div>
    )
}