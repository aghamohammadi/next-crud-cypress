import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const { from, to, order, searchText } = await request.json();
    const search = searchText?searchText.replace(/-/g, ' '):'';

    let orderType = {};
    switch (order) {
        case 0:
            orderType = {
                insertDate: 'desc'
            };
            break;
        case 1:
            orderType = {
                insertDate: 'asc'
            };
            break;
        case 2:
            orderType = {
                id: 'desc'
            };
            break;
        case 3:
            orderType = {
                id: 'asc'
            };
            break;
        
    
        default:
            orderType = {
                insertDate: 'desc'
            };
            break;
    }

    const posts = await prisma.post.findMany({
        where: {
            // published: true
            title:{
                contains: search,
            }
        },
        skip: from,
        take: to,
        orderBy: orderType,
    });
    const postsPublished = await prisma.post.findMany({
        where: {
            published: true,
            title: {
                contains: search,
            }
        },
        skip: from,
        take: to,
        orderBy: orderType,
    });

    const totalCountPublished = await prisma.post.count({
        where: {
            published: true,
            title: {
                contains: search,
            }
        }
    });
    const totalCount = await prisma.post.count({
        where: {
            title: {
                contains: search,
            }
        }
    });

    return NextResponse.json({ posts, postsPublished, totalCount, totalCountPublished })
}







