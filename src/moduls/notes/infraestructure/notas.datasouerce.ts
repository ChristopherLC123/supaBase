
import { supabase } from "@/lib/supabase";
import { Note } from "../domain/note.entity";


// =====================================
// OBTENER TODAS LAS NOTAS
// =====================================
export async function getAllNotes(): Promise<Note[]> {

    const { data, error } = await supabase
        .from("NOTAS")
        .select("*");

    if (error) {
        console.log("Error al consultar:", error);
        throw error;
    }

    return data as Note[];
}


// =====================================
// CREAR UNA NOTA
// =====================================
export async function create(
    title: string,
    description: string
): Promise<Note> {

    // Obtener usuario autenticado
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    if (!user) {
        throw new Error("No hay un usuario autenticado");
    }

    // Comprobar sesión
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) {
        throw sessionError;
    }

    // Mostrar información
    console.log("ID del usuario:", user.id);
    console.log("Rol:", sessionData.session?.user.role);
    console.log("ID de sesión:", sessionData.session?.user.id);
    console.log("Título:", title);
    console.log("Descripción:", description);

    // Insertar nota
    const { data, error } = await supabase
        .from("NOTAS")
        .insert({
            title: title,
            description: description,
            user_id: user.id
        })
        .select()
        .single();

    if (error) {
        console.log("Error al insertar:", error);
        throw error;
    }

    console.log("Nota guardada:", data);

    return data as Note;
}


// =====================================
// ACTUALIZAR UNA NOTA
// =====================================
export async function update(note: Note): Promise<Note> {

    // Obtener usuario autenticado
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    if (!user) {
        throw new Error("No hay un usuario autenticado");
    }

    // Mostrar información
    console.log("ID de la nota:", note.id);
    console.log("ID del usuario:", user.id);

    // Actualizar nota
    const { data, error } = await supabase
        .from("NOTAS")
        .update({
            title: note.title,
            description: note.description
        })
        .eq("id", note.id)
        .eq("user_id", user.id)
        .select()
        .maybeSingle();

    if (error) {
        console.log("Error al actualizar:", error);
        throw error;
    }

    if (!data) {
        throw new Error(
            "No se encontró la nota o no tienes permiso para editarla"
        );
    }

    console.log("Nota actualizada:", data);

    return data as Note;
}


// =====================================
// ELIMINAR UNA NOTA
// =====================================
export async function deleteNote(id: number): Promise<boolean> {

    // Obtener usuario autenticado
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    if (!user) {
        throw new Error("No hay un usuario autenticado");
    }

    console.log("ID de la nota a eliminar:", id);
    console.log("ID del usuario:", user.id);

    // Eliminar nota propia
    const { data, error } = await supabase
        .from("NOTAS")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id)
        .select();

    if (error) {
        console.log("Error al eliminar:", error);
        throw error;
    }

    if (!data || data.length === 0) {
        throw new Error(
            "No se encontró la nota"
        );
    }

    console.log("Nota eliminada correctamente");

    return true;
}
