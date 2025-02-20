import { z } from 'zod'

const appRouter = router({
    userById: publicProcedure.input(z.string()).query(async opts => {
        const { input } = opts

        const input: string
        const user = await db.user.findById(input)

        const user: User | undefined
        return user
    })
})

const appRouter = router({
    userCreate: publicProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async opts => {
            const { input } = opts

            const input: {
                name: string
            }
            const user = await db.user.create(input)

            const user: {
                name: string
                id: string
            }
            return user
        })
})
