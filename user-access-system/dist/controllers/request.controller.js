"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOwnRequests = exports.updateRequestStatus = exports.getAllRequests = exports.createAccessRequest = void 0;
const ormconfig_1 = require("../ormconfig");
const Request_1 = require("../entities/Request");
const User_1 = require("../entities/User");
const Software_1 = require("../entities/Software");
const requestRepo = ormconfig_1.AppDataSource.getRepository(Request_1.Request);
const userRepo = ormconfig_1.AppDataSource.getRepository(User_1.User);
const softwareRepo = ormconfig_1.AppDataSource.getRepository(Software_1.Software);
// ▶ EMPLOYEE: Submit access request
const createAccessRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { softwareId, accessType, reason } = req.body;
        const userId = req.user.id;
        const user = yield userRepo.findOneBy({ id: userId });
        const software = yield softwareRepo.findOneBy({ id: softwareId });
        if (!user || !software) {
            res.status(404).json({ message: "User or Software not found" });
            return;
        }
        const newRequest = requestRepo.create({
            user,
            software,
            accessType,
            reason,
            status: "Pending",
        });
        yield requestRepo.save(newRequest);
        res.status(201).json({ message: "Access request submitted", request: newRequest });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to submit request", details: err });
    }
});
exports.createAccessRequest = createAccessRequest;
// ▶ MANAGER: Get all access requests
const getAllRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield requestRepo.find({
            relations: ["user", "software"],
            order: { id: "DESC" },
        });
        res.status(200).json({ requests });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch requests", details: error });
    }
});
exports.getAllRequests = getAllRequests;
const updateRequestStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestId = parseInt(req.params.id);
        const { status } = req.body;
        if (!["Approved", "Rejected"].includes(status)) {
            res.status(400).json({ message: "Invalid status. Use 'Approved' or 'Rejected'." });
            return;
        }
        const request = yield requestRepo.findOne({
            where: { id: requestId },
            relations: ["user", "software"],
        });
        if (!request) {
            res.status(404).json({ message: "Request not found" });
            return;
        }
        request.status = status;
        yield requestRepo.save(request);
        res.status(200).json({ message: `Request ${status.toLowerCase()}`, request });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update request", details: error });
    }
});
exports.updateRequestStatus = updateRequestStatus;
const getOwnRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const requests = yield requestRepo.find({
            where: { user: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } },
            relations: ["software"],
        });
        res.status(200).json({ requests });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch requests" });
    }
});
exports.getOwnRequests = getOwnRequests;
