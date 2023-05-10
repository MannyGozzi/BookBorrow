import { Router, Request, Response, NextFunction } from 'express';
import User from '../entities/user';
import { issueJWT } from '../helpers/JWT';

export default () => {
  const router = Router();
  router.post('/login', async (req: Request, res: Response) => {
      const datasource = req.app.get('datasource');
      const repo = datasource.getRepository(User);

      const user = await repo.findOne({ where: { email: req.body.email } });

      if (!user) {
        return res.status(401).send({ user, msg: 'No user found.' });
      }

      if (!await user.isValidPassword(req.body.password)) {
        return res.status(401).send({ user, msg: 'Invalid password.' });
      }

      const jwtToken = issueJWT(user);
      return res
        .cookie('jwt', jwtToken.token, { httpOnly: true, secure: false })
        .json({ user, msg: 'Logged in Successfully' })
  });
  router.get('/logout', (req: Request, res: Response) => {
      if (!req.userId) {
        return res.status(400).send({ msg: 'Cannot logout if you are not logged in' });
      }

      return res
        .clearCookie('jwt')
        .json({ msg: 'Logged out Successfully' })
  });
  return router;
};
