import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.cookie?.split('=')[1]
  if (!token) {
    return res.status(401).send({ auth: false, msg: 'No token provided.' })
  }
  const decoded = jsonwebtoken.verify(token, 'EXAMPLESECRRET')
  const payload = decoded as JwtPayload
  if (!decoded || !payload.id) {
    return res.status(500).send({ auth: false, msg: 'Failed to authenticate token.' })
  }
  // if everything good, save to request for use in other routes
  req.userId = payload.id
  next()
}
