import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export const GET = async (request) => {
    try {
        const prompts = await prisma.prompt.findMany({
            include: {
                creator: true
            }
        })
        await prisma.$disconnect()

        return new Response(JSON.stringify(prompts), {
            status: 200
        })

    } catch (error) {
        await prisma.$disconnect()
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}
