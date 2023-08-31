
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { Envs } from "@/utils/config";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const file: File | null = formData.get('imageFile') as unknown as File;
    const data = formData.get('data')?.toString() || '';
    const { id,title, summary, imagePath, content, insertDate, published } = JSON.parse(data);

    let filePath: string | null = null;

    if (file && file.name) {


        const fileName = `${path.parse(file.name).name}-${Math.floor(Math.random() *100000) + 1}${path.parse(file.name).ext}`;
        const destinationDirPath = path.join(process.cwd(), "public/upload");

        const fileArrayBuffer = await file.arrayBuffer();

        if (!existsSync(destinationDirPath)) {
            fs.mkdir(destinationDirPath, { recursive: true });
        }
        await fs.writeFile(
            path.join(destinationDirPath, fileName),
            Buffer.from(fileArrayBuffer)
        );
        filePath = `/upload/${fileName}`;

    }

    const updatePost= await prisma.post.update({
        where: {
            id: +id
        },
        data: {
            title: title,
            summary: summary,
            content: content,
            insertDate: insertDate,
            imagePath: filePath || imagePath,
            published: published
        },
    });
    revalidateTag('updated');
    revalidateTag(`updated-${id}`);
    revalidatePath(`/admin`);
    revalidatePath(`/admin/edit/${id}`);

    return NextResponse.json(1, { status: 200 });

    
}


