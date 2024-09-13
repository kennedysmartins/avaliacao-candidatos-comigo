import express from "express"
import * as userController from "../controllers/user.controller"
import verifyToken from "@/middlewares/authMiddleware"

const router = express.Router()


router.use(verifyToken).post("/", userController.createUser)
router.use(verifyToken).get("/", userController.getUsers)
router.use(verifyToken).get("/:id", userController.getUserById)
router.use(verifyToken).put("/:id", userController.updateUser)
router.use(verifyToken).delete("/:id", userController.deleteUser)

export default router