import express from "express";
import {
    updateOfficer,
    deleteOfficer,
    getAllOfficer,
    getSingleOfficer,
} from "../Controllers/officerController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", getSingleOfficer);
router.get("/", getAllOfficer);
router.put("/:id", authenticate, restrict(['officer']), updateOfficer);
router.delete("/:id",authenticate, restrict(['officer']), deleteOfficer);

export default router;