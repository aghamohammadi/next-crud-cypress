
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { Envs } from "@/utils/config";

export async function POST(request: NextRequest) {
    const { id } = await request.json();

    const updatePost = await prisma.post.delete({
        where: {
            id: +id
        }        
    });
    revalidateTag('updated');
    revalidateTag(`updated-${id}`);
    revalidatePath(`/admin`);
    revalidatePath(`/admin/edit/${id}`);
    return NextResponse.json(1, { status: 200 });

    
}


