"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../entities/user"));
const JWT_1 = require("../helpers/JWT");
exports.default = () => {
    const router = (0, express_1.Router)();
    router.post('/login', async (req, res) => {
        const datasource = req.app.get('datasource');
        const repo = datasource.getRepository(user_1.default);
        const user = await repo.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).send({ user, msg: 'No user found.' });
        }
        if (!await user.isValidPassword(req.body.password)) {
            return res.status(401).send({ user, msg: 'Invalid password.' });
        }
        const jwtToken = (0, JWT_1.issueJWT)(user);
        return res
            .cookie('jwt', jwtToken.token, { httpOnly: true, secure: false })
            .json({ user, msg: 'Logged in Successfully' });
    });
    router.get('/logout', (req, res) => {
        if (!req.userId) {
            return res.status(400).send({ msg: 'Cannot logout if you are not logged in' });
        }
        return res
            .clearCookie('jwt')
            .json({ msg: 'Logged out Successfully' });
    });
    return router;
};
//# sourceMappingURL=login.js.map