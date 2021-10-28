import mysql from 'promise-mysql';
import keys from './keys';

const db = mysql.createPool(keys.database);

db.getConnection()
    .then(connection => {
        db.releaseConnection(connection);
        console.log('DB is connected.\n');
        console.log('Press CTRL-C to stop.')
    }).catch(error => {
        if (error) {
            if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('DATABASE CONNECTION WAS CLOSED\n');
            };
            if (error.code === 'ERR_CON_COUNT_ERROR') {
                console.error('DATABASE HAS TOO MANY CONNECTIONS\n');
            };
            if (error.code == 'ECONNREFUSED') {
                console.error('DATABASE CONNECTION WAS REFUSED\n');
            };
        };
    });

export default db;