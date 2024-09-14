import { RegisterPurposeForm } from "@/components/ModalRegisterPurpose/RegisterPurposeForm"
import { useSQLiteContext, openDatabaseAsync } from "expo-sqlite"

export type PurposeDatabaseProps = RegisterPurposeForm & {
    id: number
}

export function usePurposeDatabase() {
    const database = useSQLiteContext();


    async function create(data: Omit<PurposeDatabaseProps, "id">) {
        const statement = await database.prepareAsync("INSERT INTO purposes_table (name, initialData, finalDate, withAlert, timeAlert) VALUES ($name, $initialData, $finalDate, $withAlert, $timeAlert);")
        try {
            await statement.executeAsync({ $name: data.name, $initialData: data.initialData, $finalDate: data.finalDate, $withAlert: data.withAlert, $timeAlert: data.timeAlert })
        } catch (error) {

        } finally {
            await statement.finalizeAsync();
        }
    }

    async function getAll() {

        try {
            const query = "SELECT * FROM purposes_table"
            const response = await database.getAllAsync(query);
            if (response.length > 0) {
                return response;
            }
        } catch (error) {
            throw error
        } finally {
        }
    }

    async function updateIsActive(id: number) {

        const statement = await database.prepareAsync("UPDATE purposes_table SET isActive = NOT isActive WHERE id = $id")
        try {
            const result = await statement.executeAsync({ $id: id })
            return result
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function deleteById(id: string): Promise<PurposeDatabaseProps> {
        const statement = await database.prepareAsync("DELETE FROM purposes_table WHERE id = $id")
        try {
            const result = await statement.executeAsync({ $id: id })
            return result as unknown as PurposeDatabaseProps
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync();
        }
    }

    return { create, getAll, deleteById, updateIsActive }
}