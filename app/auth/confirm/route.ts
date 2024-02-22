import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const tokenHash = searchParams.get('tokenHash')
    const type = searchParams.get('type') as EmailOtpType | null
    const next = searchParams.get('next') ?? '/'
    
    const redirectTo = request.nextUrl.clone()
    redirectTo.pathname = next
    redirectTo.searchParams.delete('tokenHash')
    redirectTo.searchParams.delete('type')

    if (tokenHash && type) {
        const supabase = createClient()
        const { error } = await supabase.auth.verifyOtp({
            type: type,
            token_hash: tokenHash
        })

        if (!error) {
            redirectTo.searchParams.delete('next')
            return NextResponse.redirect(redirectTo)
        }

        redirectTo.pathname = '/error'
        return NextResponse.redirect(redirectTo)
    }
}