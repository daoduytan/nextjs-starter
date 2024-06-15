import { publicProcedure, router } from '@/server/trpc';

export const heathyRouter = router({
    check: publicProcedure.query(() => 'Ok'),
});
