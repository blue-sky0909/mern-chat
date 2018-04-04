import mongoose from 'mongoose';
import crypto from 'crypto';
const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
    email: { type: 'String', required: true },
    username: { type: 'String', required: true, index: {unique: true} },
    password: { type: 'String', required: true },
    fullname: { type: 'String', required: true },
	displayname: { type: 'String', required: true }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

workspaceSchema.methods.setPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

export default mongoose.model('workspace', workspaceSchema);
