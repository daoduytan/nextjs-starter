import { prisma } from '@/lib/prisma';
import { nextAuthOption } from '@/lib/auth';
import type { UserModel } from '@/model/user.model';
import type { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { type NextRequest } from 'next/server';

export async function createContext(req: NextRequest) {
    let context: {
        req: NextRequest;
        prisma: PrismaClient;
        user?: UserModel;
    } = { prisma, req };

    try {
        const session = await getServerSession(nextAuthOption);

        const userId = session?.user?.id;

        if (!userId) {
            return context;
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        return {
            ...context,
            user,
        };
    } catch (error) {
        console.log({ error });
        return context;
    }
}

export type Context = Awaited<ReturnType<typeof createContext>>;
