import Message from '../models/message';
import Workspace from '../models/workspace';

export async function getMessages(req, res) {
    const workspaceId = await Workspace.findOne({ displayname: req.body.workspace}).select('_id').exec();
    const path = workspaceId._id;

    const today = new Date()
    let AweekAgo = new Date();
    AweekAgo.setDate(today.getDate() - 7);
    Message.find({
        created_at: {
            $gte: AweekAgo,
            $lte: today
        },
        path: path
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