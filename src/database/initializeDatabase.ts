import { type SQLiteDatabase } from 'expo-sqlite';
export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`CREATE TABLE IF NOT EXISTS purposes_table (
        id integer primary key autoincrement,
        name text not null,
        initialData datetime not null,
        finalDate datetime not null,
        withAlert boolean not null,
        isActive boolean not null DEFAULT 1
    );`);
}