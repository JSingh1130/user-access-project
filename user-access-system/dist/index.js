"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // ✅ Add this
const ormconfig_1 = require("./ormconfig");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const software_routes_1 = __importDefault(require("./routes/software.routes"));
const request_routes_1 = __importDefault(require("./routes/request.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // ✅ Enable CORS for all origins (during development)
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api", software_routes_1.default);
app.use("/api", request_routes_1.default);
ormconfig_1.AppDataSource.initialize().then(() => {
    console.log("DB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
}).catch(err => console.log("DB Error", err));
