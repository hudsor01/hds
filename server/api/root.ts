import { router } from './trpc'
import { propertiesRouter } from './routers/properties'

export const appRouter = router({
    properties: propertiesRouter
})

export type AppRouter = typeof appRouter
