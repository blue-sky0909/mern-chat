import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: 'String', required: true },
    username: { type: 'String', required: true },
    password: { type: 'String', required: true }
});

userSchema.methods.setPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET");
};

export default mongoose.model('user', userSchema);
