const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    location: {
       city:String,
       state:String,
       country:String,
       latitude:String,
       longitude:String 
    },
    images:[{
        main:String,
        cover:String,
        side1:String,
        side2:String,
        other:Array
    }],
    toDo:[{
        name:String,
        place:String,
        things:Array,
    }],
    restaurants:[{
        name:String,
        images:Array,
        location:{
            latitude:String,
            longitude:String 
        },
    contact:String
    }],
    stay:[{
        name:String,
        images:Array,
        location:{
            latitude:String,
            longitude:String 
        },
    contact:String
    }],
    foods:[
        {
            name:String,
            images:Array,
            price:String,
            available:String   
        }
    ],
    rating:Number,
    reviews:[{
        reviewername:String,
        tripMember:Number,
        date:Date.now(),
        comment:String,
        rate:Number,
        expendature:Number,
        email:String  
    }]
},
{
    timestamps: true
});

const Users = mongoose.model("places", Schema);

module.exports = Users