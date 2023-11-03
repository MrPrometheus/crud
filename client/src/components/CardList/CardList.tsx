import React, {ChangeEventHandler, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {deleteAll, findByText, getAll, ICard} from "../../api";
import {string} from "yup";

interface ICardType extends ICard {
    id: string
}

export const CardList = () => {
    const [currentCard, setCurrentCard] = useState<ICardType | undefined>()
    const [currentCardIndex, setCurrentCardIndex] = useState<number | undefined>(undefined)
    const [searchVal, setSearchVal] = useState("")
    const [cards, setCards] = useState<ICardType[]>([])


    const retrieveCards = () => {
        getAll().then((res) => setCards(res.data))
    }

    const refreshList = () => {
        retrieveCards()
        setCurrentCard(undefined)
        setCurrentCardIndex(undefined)
    }

    const handleOnChangeSearchTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchVal(e.target.value)
    }

    const handleClickSearch = () => {
        findByText(searchVal).then((res) => {
            console.log(res.data)
            setCards(res.data)
        })
    }

    const handleRemoveAll = () => {
        deleteAll().then(() => {
            retrieveCards()
        })
    }

    useEffect(() => {
        getAll().then((res) => setCards(res.data))
    }, []);

    return (<div className="list row">
        <div className="col-md-8">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Поиск"
                    value={searchVal}
                    onChange={handleOnChangeSearchTitle}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleClickSearch}
                    >
                        Найти
                    </button>
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <h4>Список карточек</h4>

            <ul className="list-group">
                {cards &&
                    cards.map((card, index) => (
                        <li
                            className={
                                "list-group-item " +
                                (index === currentCardIndex ? "active" : "")
                            }
                            onClick={() => {
                                setCurrentCard(card)
                                setCurrentCardIndex(index)
                            }}
                            key={index}
                        >
                            {card.characteristics["ТНВЭД"]}
                        </li>
                    ))}
            </ul>

            <button
                className="m-3 btn btn-sm btn-danger"
                onClick={handleRemoveAll}
            >
                Remove All
            </button>
        </div>
        <div className="col-md-6">
            {currentCard ? (
                <div>
                    <h4>Карточка</h4>
                    <div>
                        <label>
                            <strong>Id:</strong>
                        </label>{" "}
                        {currentCard.id}
                    </div>
                    <div>
                        <label>
                            <strong>ТНВЭД:</strong>
                        </label>{" "}
                        {currentCard.characteristics["ТНВЭД"]}
                    </div>
                    <div>
                        <label>
                            <strong>Предмет:</strong>
                        </label>{" "}
                        {currentCard.characteristics["Предмет"]}
                    </div>
                    <div>
                        <label>
                            <strong>Ширина упаковки:</strong>
                        </label>{" "}
                        {currentCard.characteristics["Ширина упаковки"].toString()}
                    </div>

                    <Link
                        to={"/cards/" + currentCard.id}
                        className="badge badge-warning"
                        style={{color: "black", background: "yellow"}}
                    >
                        Редактировать
                    </Link>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Нажмите на карточку...</p>
                </div>
            )}
        </div>
    </div>)
}