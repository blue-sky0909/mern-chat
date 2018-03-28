import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    from_user: { type: Schema.Types.ObjectId, ref: 'user', required: true  },
    to_user: { type: Schema.Types.ObjectId, ref: 'user', required: true  },
    content: { type: 'String', required: true }
});

export default mongoose.model('message', messageSchema);
