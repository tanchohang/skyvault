import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: [true, 'Please enter an Email'],
        lowercase: true,
        unique: true,
        //   validate: {
        //     validator: (email) => {
        //       var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //       return re.test(email);
        //     },
        //     message: 'Please enter a valid email',
        //   },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password must be at least 6 characters'],
    },
    name: {
        type: String,
        lowercase: true,
        required: [true, 'Please enter a name'],
        minlength: [5, 'Name must be at least 5 characters'],
    },
    profileImg: { type: String },
}, { timestamps: true, strict: true });
//hash password before doc save
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    return next();
});
//method to compare hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    return bcrypt.compare(candidatePassword, user.password);
};
const User = model('user', userSchema);
export { User };
//# sourceMappingURL=user.model.js.map