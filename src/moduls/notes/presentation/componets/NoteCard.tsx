
import { Pressable, StyleSheet, Text } from "react-native";
import { Note } from "../../domain/note.entity";

interface Props {
    note: Note;
    onEdit: (note: Note) => void;
}

export function NoteCard({ note, onEdit }: Props) {

    // Convertimos la fecha de Supabase a una fecha legible
    const fecha = new Date(note.created_at);

    const fechaTexto = !isNaN(fecha.getTime())
        ? fecha.toLocaleDateString("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
        : "Fecha no disponible";

    return (
        <Pressable
            style={styles.card}
            onPress={() => onEdit(note)}
        >
            <Text style={styles.title}>{note.title}</Text>

            <Text style={styles.description}>
                {note.description}
            </Text>

            <Text style={styles.date}>
                ◷ {fechaTexto}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        marginVertical: 7,
        marginHorizontal: 16,
        borderRadius: 12,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#263238",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#555555",
        marginBottom: 12,
    },
    date: {
        fontSize: 12,
        color: "#4785C5",
    },
});
