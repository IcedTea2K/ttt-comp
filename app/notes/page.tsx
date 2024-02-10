import { createClient } from '@/utils/supabase/server';
import { cookies } from "next/headers";

export default async function Notes() {
    const supabase = createClient();
    const { data: notes } = await supabase.from('notes').select('id');

    return (
        <pre>{JSON.stringify(notes, null, 2)}</pre>
    )
}