let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let Pass= new Schema({
    url:String,
    email:String,
    password:String,
    fecha: String,
    detalle:String
});

module.exports= mongoose.model('Pass', Pass);