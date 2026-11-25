
import { useEffect, useState } from "react";

import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import { Note } from "../../domain/note.entity";

interface Props {
    visible: boolean;
    note: Note | null;

    onSave: (data: {
        title: string;
        description: string;
    }) => void;

    onDelete: (id: number) => void;

    onCancel: () => void;
}

export function NoteForm({
    visible,
    note,
    onSave,
    onDelete,
    onCancel
}: Props) {

    // Estados del formulario
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Cargar los datos de la nota al abrir el editor
    useEffect(() => {

        if (visible) {
            setTitle(note?.title ?? "");
            setDescription(note?.description ?? "");
        }

    }, [note, visible]);

    // Guardar o actualizar
    const guardarNota = () => {

        if (!title.trim()) {
            Alert.alert(
                "Campo obligatorio",
                "Escribe el título de la nota."
            );
            return;
        }

        onSave({
            title: title.trim(),
            description: description.trim()
        });
    };

    // Eliminar desde el editor
    const eliminarNota = () => {

        if (note) {
            onDelete(note.id);
        }

    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onCancel}
        >

            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >

                <View style={styles.modal}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >

                        {/* Encabezado */}
                        <Text style={styles.title}>
                            {note ? "Editar nota" : "Nueva nota"}
                        </Text>


                        {/* Campo del título */}
                        <Text style={styles.label}>
                            Título
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Escribe el título"
                            placeholderTextColor="#999999"
                            value={title}
                            onChangeText={setTitle}
                            maxLength={80}
                        />

                        {/* Campo de descripción */}
                        <Text style={styles.label}>
                            Descripción
                        </Text>

                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Escribe tu nota..."
                            placeholderTextColor="#999999"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            textAlignVertical="top"
                        />

                        {/* Guardar */}
                        <Pressable
                            style={styles.saveButton}
                            onPress={guardarNota}
                        >
                            <Text style={styles.saveText}>
                                Guardar nota
                            </Text>
                        </Pressable>

                        {/* Eliminar: solamente aparece al editar */}
                        {note && (
                            <Pressable
                                style={styles.deleteButton}
                                onPress={eliminarNota}
                            >
                                <Text style={styles.deleteText}>
                                    Eliminar nota
                                </Text>
                            </Pressable>
                        )}

                        {/* Cancelar */}
                        <Pressable
                            style={styles.cancelButton}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelText}>
                                Cancelar
                            </Text>
                        </Pressable>

                    </ScrollView>

                </View>

            </KeyboardAvoidingView>

        </Modal>
    );
}

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.50)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },

    modal: {
        width: "100%",
        maxHeight: "85%",
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 22,
        elevation: 8
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#252525"
    },


    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333333",
        marginBottom: 8
    },

    input: {
        backgroundColor: "#F5F6FA",
        borderWidth: 1,
        borderColor: "#E2E4E9",
        borderRadius: 12,
        padding: 14,
        fontSize: 15,
        color: "#252525",
        marginBottom: 20
    },

    textArea: {
        height: 140
    },

    saveButton: {
        backgroundColor: "#085607",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 5
    },

    saveText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    },

    deleteButton: {
        backgroundColor: "#f06363",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 12
    },

    deleteText: {
        color: "#8f3030",
        fontSize: 15,
        fontWeight: "bold"
    },

    cancelButton: {
        padding: 14,
        alignItems: "center",
        marginTop: 5
    },

    cancelText: {
        color: "#777777",
        fontSize: 15,
        fontWeight: "600"
    }

});
