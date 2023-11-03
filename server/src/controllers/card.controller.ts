import {ICard, cardModel} from "../models/card.model"
import {Request, Response} from "express"
export const create = (req: Request<{}, {}, ICard>, res: Response) => {
    const card = new cardModel(req.body)

    card.save()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({message: err.message || "Some error"})
        })
}

export const findAll  = (req: Request, res: Response) => {
    const tnved = req.query.tnved;
    const condition = tnved ? { "characteristics.ТНВЭД": { $regex: new RegExp(tnved as string), $options: "i" } } : {};

    console.log(tnved)
    console.log(condition)

    cardModel.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

export const findOne  = (req: Request, res: Response) => {
    const id = req.params.id;

    cardModel.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Tutorial with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Tutorial with id=" + id });
        });
}

export const update  = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    cardModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Card with id=${id}. Maybe Card was not found!`
                });
            } else res.send({ message: "Card was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
}

export const deleteOne = (req: Request, res: Response) => {
    const id = req.params.id;

    console.log(id)

    cardModel.deleteOne({_id: id})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Card with id=${id}. Maybe Card was not found!`
                });
            } else {
                res.send({
                    message: "Card was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Card with id=" + id
            });
        });
}

export const deleteAll  = (req: Request, res: Response) => {
    cardModel.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Cards were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all cards."
            });
        });
}