"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send({ auth: false, msg: 'No token provided.' });
    }
    jsonwebtoken_1.default.verify(token, "EXAMPLESECRRET", async (err, decoded) => {
        if (err || !decoded) {
            return res.status(500).send({ auth: false, msg: 'Failed to authenticate token.' });
        }
        // if everything good, save to request for use in other routes
        req.userId = decoded.sub;
        next();
    });
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=auth.js.map