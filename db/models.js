var mongoose= require ('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;
module.exports={
    User:{
        username:{type:String,required:true},
        password:{type:String,required:true}
    },
    Article:{
        title:'String',
        content:'String',
        createAt:{type:Date,default:Date.now}
    }
}