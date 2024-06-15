import * as routers from './routers';
import { router } from './trpc';

export const appRouter = router(routers);
export type AppRouter = typeof appRouter;
