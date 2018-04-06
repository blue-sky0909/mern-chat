import Workspace from '../models/workspace';

export function create(req, res) {
      console.log(req.body);
    Workspace.findOne({username: req.body.userName}, function(error, workspace) {
        if (workspace){
            res.send({
                status: 500,
                success: false,
                message: "This username already exists",
            })
        } else{
            const workspace = new Workspace();
            workspace.username = req.body.userName;
            workspace.fullname = req.body.fullName;
            workspace.displayname = req.body.displayName;
            workspace.password = workspace.setPassword(req.body.password);

            workspace.save(function(err, result) {
                if(err) {
                    res.status(500).send({
                        success: false,
                        error: err,
                    })
                } else {
                    res.status(200).send({
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