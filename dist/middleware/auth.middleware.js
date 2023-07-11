import { verifyToken } from '../utilities/jwtUtils.js';
export const authenticatedUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res.status(401).json({ error: 'not_authorized' });
    try {
        const user_id = verifyToken(token);
        req.user_id = user_id;
        next();
    }
    catch (err) {
        if (err)
            res.status(403).json({ err: err.message });
    }
};
//# sourceMappingURL=auth.middleware.js.map