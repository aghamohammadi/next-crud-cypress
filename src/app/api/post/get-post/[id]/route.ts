import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { id: number } }
) {
    const id = params.id;


    const post = await prisma.post.findUnique({
        where: {
            id: +id
        },        
    });
    return NextResponse.json(post)
}







