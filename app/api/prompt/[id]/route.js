import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
//GET
export const GET = async (request, { params }) => {
    try {
        const prompt = await prisma.prompt.findUnique({
            where: {
                id: parseInt(params.id),
            },
            include: {
                creator: true
            }
        })

        await prisma.$disconnect()
        if (!prompt){
            return new Response("Prompt not found", {
                status: 404
            })
        }

        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Failed to fetch prompt"), {status: 500})
    }
}

//PATCH

export const PATCH = async (request, { params }) => {
    try {
        const {prompt, tag} = await request.json()
        console.log('req', prompt, tag);
        const existingPrompt = await prisma.prompt.findUnique({
            where: {
                id: parseInt(params.id),
            },
        })

        console.log('existing', existingPrompt);

        if (!existingPrompt){
            await prisma.$disconnect();
            return new Response("Prompt not found", {
                status: 404
            })
        }

        await prisma.prompt.update({
            where: {
                id: parseInt(params.id),
            },
            data: {
                prompt: prompt,
                tag: tag,
            }
        })
        await prisma.$disconnect();
        return new Response(JSON.stringify(existingPrompt), {
            status: 200
        })
    } catch (error) {
        await prisma.$disconnect();
        return new Response("Failed to update prompt", {status: 500})
    }
}


//DELETE
export const DELETE = async (request, { params }) => {
    try {
        const existingPrompt = await prisma.prompt.findUnique({
            where: {
                id: parseInt(params.id),
            },
        })


        if (!existingPrompt){
            await prisma.$disconnect()
            return new Response("Prompt not found", {
                status: 404
            })
        }

        console.log(existingPrompt)

        await prisma.prompt.delete({
            where: {
                id: parseInt(params.id),
            },
        })
        await prisma.$disconnect()

        return new Response('Deleted successfully', {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to delete prompt", {status: 500})
    }
}

