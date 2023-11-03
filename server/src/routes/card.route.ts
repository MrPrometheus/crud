import {Router} from "express"
import {create, findAll, findOne, update, deleteOne, deleteAll} from "../controllers/card.controller"

const router = Router()

router.post("/", create)
router.get("/", findAll)
router.get("/:id", findOne)
router.put("/:id", update)
router.delete("/:id", deleteOne)
router.delete("/", deleteAll)

export default router;