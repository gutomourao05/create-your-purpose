import { z } from "zod";


export const RegisterPurposeSchema = z.object({
    name: z.string().min(1, "Obrigatório"),

});

export type RegisterPurposeForm = z.infer<
    typeof RegisterPurposeSchema
>;

export const REGISTER_PURPOSE_DEFAULT_FORM_VALUES: RegisterPurposeForm =
{
    name: "",

};
