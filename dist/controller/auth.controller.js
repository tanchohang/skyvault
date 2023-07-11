import { User } from '../model/user.model.js';
import { createToken } from '../utilities/jwtUtils.js';
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('incorrect email address');
        }
        const isAuth = await user.comparePassword(password);
        if (!isAuth) {
            throw new Error('incorrect password');
        }
        const token = createToken(user._id);
        res.status(200).json({
            email: user.email,
            name: user.name,
            id: user._id,
            access_token: token,
        });
    }
    catch (err) {
        // if incorrect email or password send generic error message for security reasons
        if (err.message === 'incorrect email address' ||
            err.message === 'incorrect password') {
            err.message = 'invalid email or password';
        }
        res.status(400).json({ error: err.message });
    }
};
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ email, password, name });
        const token = createToken(user._id);
        res.status(201).json({
            name: user.name,
            email: user.email,
            id: user._id,
            access_toke: token,
        });
    }
    catch (error) {
        //TODO: error does not cover User.create() error (500 server erro )
        console.log(error.message, error.code);
        //validatoin errors
        let errorResponse = { email: '', password: '', name: '' };
        if (error.message.includes('user validation failed')) {
            Object.values(error.errors).forEach(({ properties }) => {
                errorResponse[properties.path] = properties.message;
            });
        }
        //duplicate email error code 11000
        if (error.code === 11000) {
            errorResponse.email = 'Email is already in use';
        }
        res.status(400).json({ errorResponse });
    }
};
export const logout = (req, res) => {
    if (req.user_id) {
        req.user_id = null;
        res.status(200).json({ msg: 'logged out successfuly' });
    }
    res.status(401).json({ msg: 'not authorized' });
};
//# sourceMappingURL=auth.controller.js.map