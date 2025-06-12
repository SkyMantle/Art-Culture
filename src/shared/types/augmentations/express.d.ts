export {}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number,
        roles: string[],
        email: string,
      },
    }
  }
}