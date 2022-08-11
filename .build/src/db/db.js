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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDBInstance = exports.db = void 0;
var pg = require("pg");
var sequelize_1 = require("sequelize");
var author_1 = require("./models/author");
var book_1 = require("./models/book");
var publisher_1 = require("./models/publisher");
var db = /** @class */ (function () {
    function db() {
        this.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: "postgres",
            dialectModule: pg,
            logging: false,
        });
        (0, book_1.initBook)(this.sequelize);
        (0, author_1.initAuthor)(this.sequelize);
        (0, publisher_1.initPublisher)(this.sequelize);
        this.book = this.sequelize.models.book;
        this.author = this.sequelize.models.author;
        this.publisher = this.sequelize.models.publisher;
    }
    db.prototype.associate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Book has many authors (1 to n)
                this.book.belongsToMany(this.author, { through: 'book_author' });
                // Book has 1 publisher (1 to 1)
                this.book.belongsTo(this.publisher, { foreignKey: 'publisher_id' });
                // Author has many books (1 to n)
                this.author.belongsToMany(this.book, { through: 'book_author' });
                // Publisher has many books (1 to n)
                this.publisher.hasMany(this.book, { foreignKey: 'publisher_id' });
                return [2 /*return*/];
            });
        });
    };
    db.prototype.seed = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, author_1.seedAuthor)(this)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, publisher_1.seedPublisher)(this)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, book_1.seedBook)(this)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    db.prototype.authenticate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        //Create associations
                        return [4 /*yield*/, this.associate()];
                    case 1:
                        //Create associations
                        _a.sent();
                        //Sync DB
                        return [4 /*yield*/, this.sequelize.sync({ force: false })
                                .then(function () { return console.log('DB Connection established successfully.'); })
                                .catch(function (err) { return console.error("DB Sequelize Connection Failed: ".concat(err)); })];
                    case 2:
                        //Sync DB
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Unable to connect to the database:', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return db;
}());
exports.db = db;
var getDBInstance = function () { return __awaiter(void 0, void 0, void 0, function () {
    var DB;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                DB = new db();
                return [4 /*yield*/, DB.authenticate()];
            case 1:
                _a.sent();
                return [4 /*yield*/, DB.seed()];
            case 2:
                _a.sent();
                return [2 /*return*/, DB];
        }
    });
}); };
exports.getDBInstance = getDBInstance;
//# sourceMappingURL=db.js.map