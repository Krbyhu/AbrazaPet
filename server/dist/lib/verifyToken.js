"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenValidation = (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json('Acceso denegado');
        }
        ;
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'TOKENSECRET');
        next();
    }
    catch (error) {
        return res.status(401).json('Acceso denegado. Token expirado');
    }
};
exports.tokenValidation = tokenValidation;
