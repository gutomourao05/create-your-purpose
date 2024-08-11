import { Text, TouchableOpacity, View } from "react-native"
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet"
import { styles } from "./styles"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { REGISTER_PURPOSE_DEFAULT_FORM_VALUES, RegisterPurposeForm, RegisterPurposeSchema } from "./RegisterPurposeForm";
import { usePurposeDatabase } from "@/database/hooks/usePurposeDatabase";

const ModalContent = () => {

    const createPurpose = usePurposeDatabase();

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<RegisterPurposeForm>({
        resolver: zodResolver(RegisterPurposeSchema),
        defaultValues: REGISTER_PURPOSE_DEFAULT_FORM_VALUES,
    });
    function onSubmit(data: RegisterPurposeForm) {
        createPurpose.create(data)
    }

    return (
        <BottomSheetView style={styles.contentContainer} >
            <View style={styles.header}>
                <Text style={styles.title}>Cadastre seu propósito</Text>
                <Text style={styles.titleSmall}>Em nome de Jesus</Text>
            </View>
            <View style={styles.body}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value, ...rest } }) => (
                        <View >
                            <BottomSheetTextInput
                                placeholder="Dê um nome para o propósito"
                                placeholderTextColor={"gray"}
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                {...rest}
                            />
                            {!!errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
                        </View>
                    )} />
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetView >
    )
}

export { ModalContent }
