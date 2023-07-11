import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
export function createToken(id) {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 3 * 24 * 60 * 60,
    });
}
export function verifyToken(token) {
    return jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            throw new Error(err.message + ':jwrUtils/verifyToken()');
        return user.id;
    });
}
//# sourceMappingURL=jwtUtils.js.map