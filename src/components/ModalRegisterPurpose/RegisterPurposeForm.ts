import { z } from "zod";

const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/;


export const RegisterPurposeSchema = z.object({
    name: z.string().min(1, "Obrigatório"),
    initialData: z.string().regex(dateRegex, "Data inválida, deve estar no formato DD/MM/AAAA"),
    finalDate: z.string().regex(dateRegex, "Data inválida, deve estar no formato DD/MM/AAAA"),
    withAlert: z.boolean(),
    timeAlert: z.string(),
    isActive: z.boolean()

}).superRefine((data, ctx) => {
    if (data.withAlert && !timeRegex.test(data.timeAlert)) {
        ctx.addIssue({
            code: "custom",
            path: ["timeAlert"],
            message: "Horário inválido, deve estar no formato HH:MM",
        });
    }
});;

export type RegisterPurposeForm = z.infer<
    typeof RegisterPurposeSchema
>;

export const REGISTER_PURPOSE_DEFAULT_FORM_VALUES: RegisterPurposeForm =
{
    name: "",
    initialData: "",
    finalDate: "",
    withAlert: false,
    timeAlert: "",
    isActive: true
}
