import { z } from "zod";


export const RegisterPurposeSchema = z.object({
    name: z.string().min(1, "Obrigatório"),
    initialData: z.string().min(1, "Obrigatório"),
    finalDate: z.string().min(1, "Obrigatório"),
    withAlert: z.boolean(),
    timeAlert: z.string()

}).superRefine((data, ctx) => {
    if (data.withAlert && data.timeAlert === "") {
        ctx.addIssue({
            code: "custom",
            path: ["timeAlert"],
            message: "Obrigatório",
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
}
