"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
const db = promise_mysql_1.default.createPool(keys_1.default.database);
db.getConnection()
    .then(connection => {
    db.releaseConnection(connection);
    console.log('DB is connected.\n');
    console.log('Press CTRL-C to stop.');
}).catch(error => {
    if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED\n');
        }
        ;
        if (error.code === 'ERR_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TOO MANY CONNECTIONS\n');
        }
        ;
        if (error.code == 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED\n');
        }
        ;
    }
    ;
});
exports.default = db;
