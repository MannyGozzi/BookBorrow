import { Router, Request, Response } from 'express'
import User from '../models/User'
import { issueJWT } from '../helpers/JWT'

export default () => {
  const router = Router()
  router.post('/login', async (req: Request, res: Response) => {
    const user = await User.findOne({ where: { email: req.body.email } })

    if (!user) {
      return res.status(401).send({ user, msg: 'No user found.' })
    }

    if (!(await user.isValidPassword(req.body.password))) {
      return res.status(401).send({ user, msg: 'Invalid password.' })
    }

    const jwtToken = issueJWT(user)
    return res
      .cookie('jwt', jwtToken.token, { httpOnly: true, secure: false })
      .json({ user, msg: 'Logged in Successfully' })
  })
  router.get('/logout', (req: Request, res: Response) => {
    if (!req.userId) {
      return res.status(400).send({ msg: 'Cannot logout if you are not logged in' })
    }

    return res.clearCookie('jwt').json({ msg: 'Logged out Successfully' })
  })
  return router
}
