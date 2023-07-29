import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export const GET = async (request, {params}) => {
    try {
        const prompts = await prisma.prompt.findMany({
            where: {
                creator_id: parseInt(params.id)
            },
            include: {
                creator: true
            }
        })
        await prisma.$disconnect()

        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return new Response("Failed to fetch prompts", {status: 500})
    }
}
