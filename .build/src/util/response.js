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
exports.badRequest = exports.internalServerError = exports.sendResponseBody = void 0;
var allowed_origins = [];
switch (process.env.STAGE) {
    case "local":
    case "dev":
        allowed_origins = ["*"];
        break;
    case "qa":
        allowed_origins = ["https://taps-qa.dk.com"];
        break;
    case "prod":
        allowed_origins = ["https://taps.dk.com"];
        break;
    default:
        allowed_origins = ["https://taps-dev.dk.com", "http://localhost:4200"];
        break;
}
var sendResponseBody = function (_a) {
    var _b = _a.err, err = _b === void 0 ? null : _b, resCode = _a.resCode, success = _a.success, message = _a.message, _c = _a.origin, origin = _c === void 0 ? allowed_origins[0] : _c;
    var headers = {
        'Access-Control-Allow-Origin': allowed_origins.includes(origin)
            ? origin
            : allowed_origins[0],
        'Access-Control-Allow-Credentials': true
    };
    return {
        statusCode: resCode,
        headers: headers,
        body: JSON.stringify({
            message: message,
            response: err ? err : success,
        }, null, 2),
    };
};
exports.sendResponseBody = sendResponseBody;
function internalServerError(error) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_d) {
            //if(process.env.STAGE !== 'prod'){
            console.log(error);
            message = 'Internal server error';
            //Attempt to give a better response message
            if ((error === null || error === void 0 ? void 0 : error.errors) && (error === null || error === void 0 ? void 0 : error.errors.length)) {
                message = "".concat((_b = (_a = error === null || error === void 0 ? void 0 : error.errors[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.toUpperCase(), ". Please check ").concat((_c = error === null || error === void 0 ? void 0 : error.errors[0]) === null || _c === void 0 ? void 0 : _c.value);
            }
            return [2 /*return*/, (0, exports.sendResponseBody)({
                    err: {
                        type: Object.getPrototypeOf(error).constructor.name,
                        message: Object.getPrototypeOf(error).constructor.message
                    },
                    resCode: 500,
                    success: null,
                    message: message,
                })];
        });
    });
}
exports.internalServerError = internalServerError;
function badRequest(message) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.sendResponseBody)({
                    err: null,
                    resCode: 400,
                    success: null,
                    message: message,
                })];
        });
    });
}
exports.badRequest = badRequest;
//# sourceMappingURL=response.js.map