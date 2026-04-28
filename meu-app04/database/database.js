import Dexie from 'dexie';

const db = new Dexie("MinhaBaseDeDados");
db.version(1).stores({
    usuarios: '++id, nome, idade'
})

export default db;