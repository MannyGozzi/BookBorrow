"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const typeorm_1 = require("typeorm");
const login_1 = __importDefault(require("./routes/login"));
const dbConfig = require('../ormconfig.json');
// Setting up port
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false })); // For body parser
app.use(body_parser_1.default.json());
app.use((0, cookie_session_1.default)({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
const AppDataSource = new typeorm_1.DataSource(dbConfig);
// wire up all the routes
app.use((0, login_1.default)());
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (_req, res) => {
    res.send('hello world');
});
AppDataSource.initialize().then(() => {
    app.set('datasource', AppDataSource);
    app.listen(PORT, () => console.log('Example app listening on port 3000!'));
});
//# sourceMappingURL=server.js.map