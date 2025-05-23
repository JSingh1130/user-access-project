"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const software_controller_1 = require("../controllers/software.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// ✅ ADD THIS GET ROUTE to fix frontend /api/software 404
router.get("/software", auth_middleware_1.authenticate, software_controller_1.getAllSoftware);
router.post("/software", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["Admin"]), software_controller_1.createSoftware);
exports.default = router;
