"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: true,
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});
const server = app.listen(3000, () => {
    console.log("listening on *:3000");
});
const io = new socket_io_1.Server(server, { cors: corsOptions });
io.on("connection", socket => {
    socket.on("color", (color, depth) => {
        io.emit("color", color, depth);
    });
});
//# sourceMappingURL=index.js.map