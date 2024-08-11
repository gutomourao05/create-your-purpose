import { type SQLiteDatabase } from 'expo-sqlite';
export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`create table if not exists purposes (
        id integer primary key autoincrement,
        name text not null
    )`)
}