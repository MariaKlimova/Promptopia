import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export const POST = async (req, )=>{

    const { creator_id, prompt, tag } = await req.json();
    const author = await prisma.user.findUnique({
        where: {
            user_id: parseInt(creator_id)
        }
    })
    try {
        const newPrompt = await prisma.prompt.create({
            data:{
                tag: tag,
                prompt: prompt,
                creator: {
                    //author: { connect: { email: session?.user?.email } },
                    connect: {
                        email: author?.email
                    }
                }
            }
        })
        await prisma.$disconnect()
        return new Response(JSON.stringify(`newPrompt ${creator_id}`), {
            status: 201
        })
    }catch (e){
        console.log(`error while creating new prompt`, e)
        await prisma.$disconnect()
        return new Response("Failed to create a new prompt", {
            status: 500,
        })
    }

}
