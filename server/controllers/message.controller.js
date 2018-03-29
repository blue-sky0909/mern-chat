// const mongoose = require('mongoose');
// const Message = mongoose.model('message');
import Message from '../models/message';
export function getMessages(req, res) {
    const today = new Date()
    let AweekAgo = new Date();
    AweekAgo.setDate(today.getDate() - 7);
    console.log(AweekAgo);
    console.log(today);
    Message.find({
        created_at: {
            $gte: AweekAgo,
            $lte: today
        }
    }, (err, messages) => {
        if(err) {
            return res.status(500).send({
                err: err,
                success: false
            })
        }
        res.status(200).send({
            success: true,
            messages: messages
        })
    })
}