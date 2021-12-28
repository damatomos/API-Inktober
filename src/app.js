"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./database/connection");
require("./controllers/ChallengerController");
const ChallengerController_1 = __importDefault(require("./controllers/ChallengerController"));
const app = (0, express_1.default)();
// Config CORS
app.use((0, cors_1.default)());
// Config Body Parser
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/challenger', ChallengerController_1.default);
const port = process.env.PORT || 4040;
app.listen(port, () => console.log('listening server on port ' + port));
