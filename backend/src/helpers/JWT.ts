import { IUser } from 'models/types'
import jsonwebtoken from 'jsonwebtoken'

export const issueJWT = (user: IUser) => {
  const id = user.id
  const expiresIn = '1d'
  const payload = {
    sub: id,
    iat: Date.now()
  }
  const signedToken = jsonwebtoken.sign(payload, 'EXAMPLESECRRET', {
    expiresIn: expiresIn
  })
  return {
    token: signedToken,
    expires: expiresIn
  }
}
