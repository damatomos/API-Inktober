"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("./database/connection");
var app = (0, express_1.default)();
var port = process.env.PORT || 4040;
app.listen(port, function () { return console.log('listening server on port ' + port); });
