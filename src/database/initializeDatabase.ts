import { type SQLiteDatabase } from 'expo-sqlite';
export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`CREATE TABLE IF NOT EXISTS purposes_table (
        id integer primary key autoincrement,
        name text not null,
        initialData text not null,
        finalDate text not null,
        withAlert boolean not null,
        timeAlert text,
        isActive boolean not null DEFAULT 1
    );`);
}