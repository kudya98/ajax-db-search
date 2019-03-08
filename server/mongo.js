const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/db1',{ useNewUrlParser: true });
// create instance of Schema
const mongoSchema =   mongoose.Schema;
// create schema
const userSchema  = {
    "first_name" : String,
    "last_name" : String,
    "email": String,
    "birth_dat": String,
};
// create model if not exists.
module.exports = mongoose.model('users',userSchema);