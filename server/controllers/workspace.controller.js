import Workspace from '../models/workspace';

export function create(req, res) {
    Workspace.findOne({email: req.body.email}, function(error, workspace) {
        if (workspace){
            res.send({
                status: 500,
                success: false,
                message: "This email already exists",
            })
        } else{
            const workspace = new Workspace();
            workspace.username = req.body.username;
            workspace.fullname = req.body.fullname;
            workspace.displayname = req.body.displayname;
            workspace.email = req.body.email;
            workspace.password = workspace.setPassword(req.body.password);

            workspace.save(function(err, result) {
                if(err) {
                    res.send({
                        status: 500,
                        success: false,
                        error: err,
                    })
                } else {
                    res.send({
                        status: 200,
                        success: true,
                        workspace: result
                    })
                }                
            })
        }
    });
}


export function list(req, res) {
    Workspace.find({}, (err, workspaces) => {
        if(err) {
            return res.status(500).send({
                err: err,
                success: false
            })
        }
        res.status(200).send({
            success: true,
            workspaces: workspaces
        })
    })
}