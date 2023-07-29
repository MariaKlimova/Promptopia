import NextAuth from "next-auth";
//import GoogleProvider from 'next-auth/providers/google'
import YandexProvider from 'next-auth/providers/yandex';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const handler = NextAuth({
    providers: [
        YandexProvider({
            clientId: process.env.YANDEX_ID,
            clientSecret: process.env.YANDEX_SECRET,
        })
    ],
    callbacks:{
        async session({session}){
            const sessionUser = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email
                }
            })

            await prisma.user.update({
                where: {
                    email: session?.user?.email
                },
                data: {
                    image: session?.user?.image,
                }
            })
            session.user.id = sessionUser?.user_id?.toString()
            await prisma.$disconnect()
            return session;
        },
        async signIn({profile}){
            try{
                const userExists = await prisma.user.findUnique({
                    where: {
                        email: profile?.default_email
                    }
                })


                if (!userExists){
                    await prisma.user.create({
                        data: {
                            email: profile?.default_email,
                            name: profile?.real_name,
                            image: `https://avatars.yandex.net/get-yapic/${profile?.default_avatar_id}`,
                        }
                    })
                }
                await prisma.$disconnect()
                return true;
            }catch(error){
                console.log(error);
                await prisma.$disconnect()
                return false;
            }
        }
    }

})

export { handler as GET, handler as POST };
