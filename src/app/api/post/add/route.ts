
import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from 'next/server'
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
   
    const file: File | null = formData.get('imageFile') as unknown as File;
    const data = formData.get('data')?.toString()||'';
    const { title, summary, imagePath, content, insertDate, published } = JSON.parse(data);
  
    let filePath: string | null = null;

    if (file ) {
        const fileName = `${path.parse(file.name).name}-${Math.floor(Math.random() * 100000) + 1}${path.parse(file.name).ext}`;
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

    const post = await prisma.post.create({
        data: {
            title, summary, content, insertDate, published, imagePath: filePath || imagePath
        },
    });
    revalidateTag('updated');
    revalidatePath(`/admin`);
    return NextResponse.json(post.id);

    
}


