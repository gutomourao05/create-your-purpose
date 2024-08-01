import { Text, TouchableOpacity, View } from "react-native"
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet"
import { styles } from "./styles"
import { useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { REGISTER_PURPOSE_DEFAULT_FORM_VALUES, RegisterPurposeForm, RegisterPurposeSchema } from "./RegisterPurposeForm";

const ModalContent = () => {
    const [type, setType] = useState<"initial" | "final">("initial");
    const [mode, setMode] = useState<"time" | "date">('date');
    const [show, setShow] = useState(false);

    const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate?.toLocaleDateString('pt-BR') || '';

        if (type === "initial" && mode === "date") {
            setValue("initialDate", currentDate)
        }

        if (type === "final" && mode === "date") {
            setValue("finalDate", currentDate)
        }
    }
    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<RegisterPurposeForm>({
        resolver: zodResolver(RegisterPurposeSchema),
        defaultValues: REGISTER_PURPOSE_DEFAULT_FORM_VALUES,
    });
    function onSubmit(data: RegisterPurposeForm) {
        console.log(data)
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
                <View style={styles.boxInput}>
                </View>
                {show && <DateTimePicker mode={mode} value={new Date()} onChange={onChangeDate} />}
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetView >
    )
}

export { ModalContent }
