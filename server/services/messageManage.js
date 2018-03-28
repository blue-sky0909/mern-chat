const mongoose = require('mongoose');
const Message = mongoose.model('message');

export function saveMessage(data) {
    const { content, from_user, to_user } = data;
    const message = new Message({
        content,
        from_user,
        to_user
    });

    message.save(function(err, result) {
        if(err) {
            console.log(err)
        } else {
           console.log(result);
        }                
    })
}