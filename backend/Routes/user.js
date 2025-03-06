import express from "express";
import {
    updateUser,
    deleteUser,
    getAllUser,
    getSingleUser,
} from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";
const router = express.Router();

router.get("/:id", authenticate, restrict(['user']), getSingleUser);
router.get("/", authenticate, restrict(['officer']), getAllUser);
router.put("/:id", authenticate, restrict(['user']), updateUser);
router.delete("/:id",authenticate, restrict(['user']), deleteUser);

export default router;