import User from "../entities/user"
import jsonwebtoken from "jsonwebtoken"

export const issueJWT = (user: User) => {
    const id = user.id
    const expiresIn = '1d'
    const payload = {
        sub: id,
        iat: Date.now()
    }
    const signedToken = jsonwebtoken.sign(payload, "EXAMPLESECRRET", { expiresIn: expiresIn })
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}