import * as SQLite from 'expo-sqlite';

export type Qrcode = {
    id: number,
    description: string,
    type: QRCodeType,
}

export enum QRCodeType { Generated, Scanned };

const db = SQLite.openDatabase('mydatabase.db');

export function createTable() {
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS QRCodes (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, type INTEGER)',
            [],
            (txObj, resultSet) => {
                console.log('Table created successfully!');
            },
            (txObj, error) => {
                console.log(`Error: ${error.message}`);
                return false;
            }
        );
    });
};

export function dropTable() {
    const sql = 'DROP TABLE IF EXISTS QRCodes';

    db.transaction((tx) => {
        tx.executeSql(sql, [], (_, result) => {
            console.log('Table deleted');
        }, (error) => {
            console.error(error);
            return false;
        });
    });
}

export function getAllQRCodes() {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM QRCodes',
                [],
                (txObj, { rows: { _array } }) => {
                    resolve(_array);
                },
                (txObj, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export function addQRCode(QRCode: Qrcode) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO QRCodes (description, type) VALUES (?, ?)',
                [QRCode.description, QRCode.type],
                (txObj, resultSet) => {
                    resolve(resultSet.insertId);
                },
                (txObj, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export function removeQRCode(QRCode: Qrcode) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM QRCodes WHERE id=?',
                [QRCode.id],
                (txObj, resultSet) => {
                    resolve(resultSet);
                },
                (txObj, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    });
};