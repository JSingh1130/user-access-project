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
exports.getAllSoftware = exports.createSoftware = void 0;
const ormconfig_1 = require("../ormconfig");
const Software_1 = require("../entities/Software");
const softwareRepo = ormconfig_1.AppDataSource.getRepository(Software_1.Software);
const createSoftware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, accessLevels } = req.body;
        const newSoftware = softwareRepo.create({ name, description, accessLevels });
        yield softwareRepo.save(newSoftware);
        res.status(201).json({ message: "Software created", software: newSoftware });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create software", details: error });
    }
});
exports.createSoftware = createSoftware;
const getAllSoftware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSoftware = yield softwareRepo.find();
        res.status(200).json(allSoftware);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch software" });
    }
});
exports.getAllSoftware = getAllSoftware;
