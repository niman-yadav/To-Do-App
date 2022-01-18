const mongoose = require('mongoose');

//created schema 
var toDO_schema = new mongoose.Schema({
    desc :{
        type: String,
        required:true

    },
    category:{
        type:String,
        required: true
    },
    duedate:{
        type:String,
        required: true
    },
    
});
//Exported model
const Todo_model = mongoose.model('Todo_model' , toDO_schema);
module.exports = Todo_model;
