import { Envs } from '@/utils/config'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret')
    const path = request.nextUrl.searchParams.get('path')
    const tag = request.nextUrl.searchParams.get('tag')

    if (secret !== Envs.MY_SECRET_TOKEN) {
        return NextResponse.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 })
    }

    if (path && tag) {
        path.split(',').forEach((item) => revalidatePath(item));
        tag.split(',').forEach((item) => revalidateTag(item));        

        return NextResponse.json({ revalidated: true, now: Date.now() })  
    }
    if (path) {
        path.split(',').forEach((item) => revalidatePath(item));
        
        return NextResponse.json({ revalidated: true, now: Date.now() })  
    }

    if (tag) {
        tag.split(',').forEach((item) => revalidateTag(item));        
        return NextResponse.json({ revalidated: true, now: Date.now() })
    }
   
    
    return NextResponse.json({
        revalidated: false,
        now: Date.now(),
        message: 'Missing data to revalidate',
    })
    
}