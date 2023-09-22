// add userId to express req type
export {}

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}
