import { appRouter } from '@/server';
import { createContext } from '@/server/context';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';

async function handler(req: NextRequest) {
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext() {
            return createContext(req);
        },
    });
}

export { handler as GET, handler as POST };
