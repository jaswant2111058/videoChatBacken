const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email: {
        type:String,
        unique:[true,"email already exist"],
        required: true
    },
    password:{
        type:String
    },
    emailStatus: {
        type:Boolean,
    },
    otp: {
        type: Number,
    },
    tasks:[
        {
            id:
            {
              type: mongoose.Schema.Types.ObjectId,
            },
            taskName:String,
            discription:String,
            date:Array,
            fromTime:String,
            toTime:String,
            completeStatus:Boolean
        }
    ]
    
},
{
    timestamps: true
});

const Users = mongoose.model("Users", Schema);

module.exports = Users