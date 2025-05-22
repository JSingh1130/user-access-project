import { Router } from "express";
import { createSoftware, getAllSoftware } from "../controllers/software.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

// ✅ ADD THIS GET ROUTE to fix frontend /api/software 404
router.get("/software", authenticate, getAllSoftware);

router.post("/software", authenticate, authorize(["Admin"]), createSoftware);

export default router;
