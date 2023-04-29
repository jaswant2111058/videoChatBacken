const users = require("../models/users");

exports.serverStatus = (req, res, next) => {
    res.status(200).send("Server is up and running.")
}
exports.tasks = async(req, res, next) =>{
    try {
        const data = await users.findOne({email:req.email}) 
        console.log(data.tasks)    
        res.status(200).send(data.tasks);
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}
exports.addtask = async(req, res) => {
    try {
        const data = await users.findOne({email:req.email})
        console.log(req.body) 
        var array = data.tasks
        array.push(req.body)
        await users.updateOne({email:req.email},{tasks:array})
        res.status(200).send({msg:"setted"});

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

exports.changetaskstatus=async (req,res)=>{
    try{
        const data = await users.findOne({email:req.email}) 
        var array = data.tasks
        for(let i=0;i<array.length;i++)
        {
            if(req.body.id===array[i].id)
            {
                const detail = {
                    id:arr.id,
                    taskName:arr.taskName,
                    discription:arr.discription,
                    date:arr.data,
                    fromTime:arr.fromTime,
                    toTime:arr.toTime,
                    completeStatus:req.body.completeStatus
                }
                array[i]=detail
            }
        }
        await users.updateOne({email:req.email},{tasks:array})
        res.status(200).send({msg:"setted"});
    }
    catch(e){
        res.send(e).status(400)
    }


}