import { RegisterPurposeForm } from "@/components/ModalRegisterPurpose/RegisterPurposeForm"
import { useSQLiteContext } from "expo-sqlite"

export type PurposeDatabaseProps = RegisterPurposeForm & {
    id: number
}

export function usePurposeDatabase() {
    const database = useSQLiteContext();
    async function create(data: Omit<PurposeDatabaseProps, "id">) {
        const statement = await database.prepareAsync("INSERT INTO purposes (name) VALUES ($name)")
        try {
            const result = await statement.executeAsync({ $name: data.name })
            const id = result.lastInsertRowId.toLocaleString();
            return { id }
        } catch (error) {
            throw error
        }
    }

    return { create }
}