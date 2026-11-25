
import { useEffect, useState } from "react";

import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

import { Note } from "../domain/note.entity";

import {
    create,
    deleteNote,
    getAllNotes,
    update
} from "../infraestructure/notas.datasouerce";

import { NoteCard } from "./componets/NoteCard";
import { NoteForm } from "./componets/NoteForm";

export function NotesView() {

    // Lista de notas
    const [notes, setNotes] = useState<Note[]>([]);

    // Nota seleccionada
    const [noteSelected, setNoteSelected] = useState<Note | null>(null);

    // Controlar el modal
    const [modalVisible, setModalVisible] = useState(false);

    // Estado de carga
    const [loading, setLoading] = useState(true);

    // Obtener notas de Supabase
    const cargarNotas = async () => {
        try {
            const data = await getAllNotes();
            setNotes(data);
        } catch (error) {
            console.log("Error al cargar notas:", error);
            Alert.alert("Error", "No se pudieron cargar las notas.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarNotas();
    }, []);

    // Crear una nota nueva
    const onNewNota = () => {
        setNoteSelected(null);
        setModalVisible(true);
    };

    // Abrir una nota existente
    const onEditNote = (note: Note) => {
        setNoteSelected(note);
        setModalVisible(true);
    };

    // Guardar o actualizar
    const onSaveNota = async (data: {
        title: string;
        description: string;
    }) => {
        try {
            //pide si o si un titulo
            if (!data.title.trim()) {
                Alert.alert("Atención", "Escribe un título.");
                return;
            }

            if (noteSelected) {

                await update({
                    ...noteSelected,
                    title: data.title.trim(),
                    description: data.description.trim()
                });

            } else {

                await create(
                    data.title.trim(),
                    data.description.trim()
                );

            }

            await cargarNotas();

            setModalVisible(false);
            setNoteSelected(null);

        } catch (error) {
            console.log("Error al guardar:", error);
            Alert.alert("Error", "No se pudo guardar la nota.");
        }
    };

    // Eliminar desde el editor
    const onDeleteNota = (id: number) => {

        Alert.alert(
            "Eliminar nota",
            "¿Estás seguro de que deseas eliminar esta nota?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteNote(id);
                            await cargarNotas();

                            setModalVisible(false);
                            setNoteSelected(null);

                        } catch (error) {
                            console.log("Error al eliminar:", error);
                            Alert.alert(
                                "Error",
                                "No se pudo eliminar la nota."
                            );
                        }
                    }
                }
            ]
        );
    };

    return (

        <View style={styles.container}>

            {/* Encabezado */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    Mis notas
                </Text>


            </View>

            {/* Lista de notas */}
            {loading ? (

                <ActivityIndicator
                    size="large"
                    color="#121315"
                    style={styles.loader}
                />

            ) : (

                <FlatList
                    data={notes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <NoteCard
                            note={item}
                            onEdit={onEditNote}
                        />
                    )}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Text style={styles.emptyTitle}>
                                Todavía no tienes notas
                            </Text>
                        </View>
                    }
                />

            )}

            {/* Botón para agregar */}
            <Pressable
                style={styles.addButton}
                onPress={onNewNota}
            >
                <Text style={styles.addButtonText}>
                    + Nueva nota
                </Text>
            </Pressable>

            {/* Editor de notas */}
            <NoteForm
                visible={modalVisible}
                note={noteSelected}
                onSave={onSaveNota}
                onDelete={onDeleteNota}
                onCancel={() => {
                    setModalVisible(false);
                    setNoteSelected(null);
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F5F6FA",
        paddingTop: 25
    },

    header: {
        paddingHorizontal: 20,
        paddingBottom: 18
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#252525"
    },
    list: {
        paddingBottom: 20,
        flexGrow: 1
    },

    loader: {
        marginTop: 50
    },

    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        marginTop: 70
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#444444"
    },



    addButton: {
        backgroundColor: "#054f2a",
        padding: 16,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 15,
        borderRadius: 14,
        alignItems: "center"
    },

    addButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    }

});
