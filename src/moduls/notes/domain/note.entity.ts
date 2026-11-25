//se usa string por que supabase tiene un buscador y por accidente lo puse 
export interface Note{

    id: number,
    user_id: string,
    title: string,
    description: string,
    created_at:string,

}