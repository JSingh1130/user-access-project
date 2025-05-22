// ✅ FIXED FILE: src/routes/request.routes.ts
import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  createAccessRequest,
  getAllRequests,
  updateRequestStatus,
  getOwnRequests // ✅ Make sure this is exported in request.controller.ts
} from "../controllers/request.controller";

const router = Router();

router.post("/requests", authenticate, authorize(["Employee"]), createAccessRequest);
router.get("/requests", authenticate, authorize(["Manager"]), getAllRequests);
router.patch("/requests/:id", authenticate, authorize(["Manager"]), updateRequestStatus);
router.get("/requests/me", authenticate, authorize(["Employee"]), getOwnRequests); // ✅ Correct path

export default router;
