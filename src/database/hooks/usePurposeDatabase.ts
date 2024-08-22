import { RegisterPurposeForm } from "@/components/ModalRegisterPurpose/RegisterPurposeForm"
import { useSQLiteContext } from "expo-sqlite"
import { useState } from "react";

export type PurposeDatabaseProps = RegisterPurposeForm & {
    id: number
}

export function usePurposeDatabase() {
    const database = useSQLiteContext();

    const [isLoading, setIsLoading] = useState(false)

    async function create(data: Omit<PurposeDatabaseProps, "id">) {
        setIsLoading(true)
        const statement = await database.prepareAsync("INSERT INTO purposes_table (name, initialData, finalDate, withAlert, timeAlert) VALUES ($name, $initialData, $finalDate, $withAlert, $timeAlert);")
        try {
            await statement.executeAsync({ $name: data.name, $initialData: data.initialData, $finalDate: data.finalDate, $withAlert: data.withAlert, $timeAlert: data.timeAlert })
            console.log(`Deu certo, segue o`)

        } catch (error) {
            setIsLoading(false)
            throw console.log(error)

        } finally {
            setIsLoading(false)
            await statement.finalizeAsync();
        }
    }

    async function getAll() {
        setIsLoading(true)
        const statement = await database.prepareAsync("SELECT * FROM purposes_table")
        try {
            const result = await statement.executeAsync()
            console.log(result)
            return result
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
            await statement.finalizeAsync();
        }
    }

    async function deleteById(id: string): Promise<PurposeDatabaseProps> {
        setIsLoading(true)
        const statement = await database.prepareAsync("DELETE FROM purposes_table WHERE id = $id")
        try {
            const result = await statement.executeAsync({ $id: id })
            return result as unknown as PurposeDatabaseProps
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
            await statement.finalizeAsync();
        }
    }

    return { create, getAll, deleteById, isLoading }
}