
declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string | null
        sessionId: string | null
        session?: {
          id: string
          userId: string
          status: string
        }
      }
    }
  }
}
