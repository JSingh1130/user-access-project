"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ✅ FIXED FILE: src/routes/request.routes.ts
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const request_controller_1 = require("../controllers/request.controller");
const router = (0, express_1.Router)();
router.post("/requests", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["Employee"]), request_controller_1.createAccessRequest);
router.get("/requests", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["Manager"]), request_controller_1.getAllRequests);
router.patch("/requests/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["Manager"]), request_controller_1.updateRequestStatus);
router.get("/requests/me", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["Employee"]), request_controller_1.getOwnRequests); // ✅ Correct path
exports.default = router;
