import jsonwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send({ auth: false, msg: 'No token provided.' });
    }
    jsonwebtoken.verify(token, "EXAMPLESECRRET", async (err, decoded) => {
        if (err || !decoded) {
            return res.status(500).send({ auth: false, msg: 'Failed to authenticate token.' });
        }
        // if everything good, save to request for use in other routes
        req.userId = decoded.sub;
        next();
    });
}