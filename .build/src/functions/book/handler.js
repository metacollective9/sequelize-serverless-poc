"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.deleteBook = exports.updateBook = exports.addBook = exports.getBook = exports.getBooks = void 0;
var db_1 = require("../../db/db");
var response_1 = require("../../util/response");
var getBooks = function (event, _context) { return __awaiter(void 0, void 0, void 0, function () {
    var DB, books, message, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, db_1.getDBInstance)()];
            case 1:
                DB = _a.sent();
                return [4 /*yield*/, DB.book.findAll({
                        include: [
                            DB.publisher,
                            DB.author
                        ]
                    })];
            case 2:
                books = _a.sent();
                message = books ? "Successfully found ".concat(books.length, " books") : 'No details found';
                return [2 /*return*/, (0, response_1.sendResponseBody)({
                        origin: event.headers.origin,
                        resCode: 200,
                        success: books,
                        message: message,
                    })];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, (0, response_1.internalServerError)(error_1)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getBooks = getBooks;
var getBook = function (event, _context) { return __awaiter(void 0, void 0, void 0, function () {
    var DB, isbn, book, message, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, db_1.getDBInstance)()];
            case 1:
                DB = _a.sent();
                isbn = event.pathParameters.isbn;
                return [4 /*yield*/, DB.book.findOne({
                        where: {
                            isbn: isbn,
                        },
                        include: [
                            DB.publisher,
                            DB.author
                        ]
                    })];
            case 2:
                book = _a.sent();
                message = book ? "Book details found" : 'No details found';
                return [2 /*return*/, (0, response_1.sendResponseBody)({
                        origin: event.headers.origin,
                        resCode: 200,
                        success: book,
                        message: message,
                    })];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, (0, response_1.internalServerError)(error_2)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getBook = getBook;
var addBook = function (event, _context) { return __awaiter(void 0, void 0, void 0, function () {
    var DB, body, book, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, (0, db_1.getDBInstance)()];
            case 1:
                DB = _a.sent();
                body = JSON.parse(event.body);
                return [4 /*yield*/, DB.book.create(__assign({}, body))];
            case 2:
                book = _a.sent();
                if (!body.Authors) return [3 /*break*/, 4];
                return [4 /*yield*/, book.setAuthors(body.Authors)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/, (0, response_1.sendResponseBody)({
                    origin: event.headers.origin,
                    resCode: 200,
                    success: book,
                    message: "Book added successfully",
                })];
            case 5:
                error_3 = _a.sent();
                return [2 /*return*/, (0, response_1.internalServerError)(error_3)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addBook = addBook;
var updateBook = function (event, _context) { return __awaiter(void 0, void 0, void 0, function () {
    var DB, book, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, db_1.getDBInstance)()];
            case 1:
                DB = _a.sent();
                book = JSON.parse(event.body);
                return [4 /*yield*/, DB.book.update(__assign({}, book), { where: { isbn: book.isbn } })];
            case 2:
                _a.sent();
                return [2 /*return*/, (0, response_1.sendResponseBody)({
                        origin: event.headers.origin,
                        resCode: 200,
                        success: book,
                        message: "Book updated successfully",
                    })];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, (0, response_1.internalServerError)(error_4)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateBook = updateBook;
var deleteBook = function (event, _context) { return __awaiter(void 0, void 0, void 0, function () {
    var DB, isbn, message, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, db_1.getDBInstance)()];
            case 1:
                DB = _a.sent();
                isbn = event.pathParameters.isbn;
                return [4 /*yield*/, DB.book.destroy({
                        where: {
                            isbn: isbn,
                        }
                    })];
            case 2:
                _a.sent();
                message = "Successfully deleted book with ISBN: ".concat(isbn);
                return [2 /*return*/, (0, response_1.sendResponseBody)({
                        origin: event.headers.origin,
                        resCode: 200,
                        success: {},
                        message: message,
                    })];
            case 3:
                error_5 = _a.sent();
                return [2 /*return*/, (0, response_1.internalServerError)(error_5)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteBook = deleteBook;
//# sourceMappingURL=handler.js.map